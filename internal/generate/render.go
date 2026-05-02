package generate

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"text/template"

	"github.com/DukeRupert/serenity/internal/templates"
)

// Render walks the builtin template tree for `generator`, executes each file
// against `data`, and writes the result into outDir. Output is staged in a
// sibling temp directory and renamed into place so a mid-render failure leaves
// nothing behind.
//
// For each template file, Render consults templates.Loader so that per-file
// project- or user-level overrides (`<project>/.serenity/templates/...`,
// `~/.serenity/templates/...`) take precedence over the embedded copy. The
// override mechanism is per-file: it lets the user replace a builtin template
// but not add new ones the generator doesn't already know about.
func Render(generator, outDir string, data any) error {
	files, err := listTemplates(generator)
	if err != nil {
		return err
	}
	if len(files) == 0 {
		return fmt.Errorf("generator %q has no templates", generator)
	}

	parent := filepath.Dir(outDir)
	if err := os.MkdirAll(parent, 0o755); err != nil {
		return fmt.Errorf("ensure parent %s: %w", parent, err)
	}
	tmp, err := os.MkdirTemp(parent, ".serenity-"+generator+"-*")
	if err != nil {
		return fmt.Errorf("stage temp dir: %w", err)
	}
	cleanup := true
	defer func() {
		if cleanup {
			os.RemoveAll(tmp)
		}
	}()

	loader := templates.NewLoader("")
	for _, rel := range files {
		body, _, err := loader.Read(generator, rel)
		if err != nil {
			return fmt.Errorf("read template %s: %w", rel, err)
		}
		// Files without a .tmpl suffix are copied verbatim. This is the escape
		// hatch for content that would collide with text/template syntax — the
		// canonical case is GitHub Actions' `${{ secrets.X }}` expressions.
		outRel := strings.TrimSuffix(rel, ".tmpl")
		outPath := filepath.Join(tmp, outRel)
		if err := os.MkdirAll(filepath.Dir(outPath), 0o755); err != nil {
			return fmt.Errorf("mkdir %s: %w", filepath.Dir(outPath), err)
		}
		f, err := os.Create(outPath)
		if err != nil {
			return fmt.Errorf("create %s: %w", outPath, err)
		}
		if strings.HasSuffix(rel, ".tmpl") {
			tmpl, err := template.New(rel).Option("missingkey=error").Parse(string(body))
			if err != nil {
				f.Close()
				return fmt.Errorf("parse template %s: %w", rel, err)
			}
			if err := tmpl.Execute(f, data); err != nil {
				f.Close()
				return fmt.Errorf("execute template %s: %w", rel, err)
			}
		} else {
			if _, err := f.Write(body); err != nil {
				f.Close()
				return fmt.Errorf("copy %s: %w", rel, err)
			}
		}
		if err := f.Close(); err != nil {
			return fmt.Errorf("close %s: %w", outPath, err)
		}
	}

	if err := os.Rename(tmp, outDir); err != nil {
		return fmt.Errorf("move %s -> %s: %w", tmp, outDir, err)
	}
	cleanup = false
	return nil
}

// listTemplates enumerates every file under files/<generator>/ in the embedded
// FS and returns paths relative to that directory, in slash form.
func listTemplates(generator string) ([]string, error) {
	root := "files/" + generator
	fsys := templates.BuiltinFS()
	var out []string
	err := fs.WalkDir(fsys, root, func(p string, d fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if d.IsDir() {
			return nil
		}
		rel, err := filepath.Rel(root, p)
		if err != nil {
			return err
		}
		out = append(out, filepath.ToSlash(rel))
		return nil
	})
	if err != nil {
		return nil, fmt.Errorf("walk %s: %w", root, err)
	}
	return out, nil
}
