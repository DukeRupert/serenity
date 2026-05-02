package templates

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
)

// Source identifies which tier of the resolution order satisfied a lookup.
type Source string

const (
	SourceProject Source = "project"
	SourceUser    Source = "user"
	SourceBuiltin Source = "builtin"
)

// Loader resolves a generator template name (e.g. "init", "main.go.tmpl")
// across the three-tier lookup order from framework-plan.md:
//
//  1. <projectDir>/.serenity/templates/<generator>/<file>
//  2. <userHome>/.serenity/templates/<generator>/<file>
//  3. Built-in templates compiled into the Serenity binary.
//
// The first match wins. ProjectDir or UserHome may be empty to skip that tier.
type Loader struct {
	ProjectDir string
	UserHome   string
}

// NewLoader builds a Loader rooted at the given project directory. UserHome is
// detected via os.UserHomeDir; if that fails, the user tier is silently skipped.
func NewLoader(projectDir string) Loader {
	home, _ := os.UserHomeDir()
	return Loader{ProjectDir: projectDir, UserHome: home}
}

// Read returns the contents of a template along with the tier it came from.
// Returns fs.ErrNotExist if no tier carries the file.
func (l Loader) Read(generator, file string) ([]byte, Source, error) {
	if l.ProjectDir != "" {
		path := filepath.Join(l.ProjectDir, ".serenity", "templates", generator, file)
		if data, err := os.ReadFile(path); err == nil {
			return data, SourceProject, nil
		} else if !errors.Is(err, fs.ErrNotExist) {
			return nil, "", fmt.Errorf("read project template %s: %w", path, err)
		}
	}

	if l.UserHome != "" {
		path := filepath.Join(l.UserHome, ".serenity", "templates", generator, file)
		if data, err := os.ReadFile(path); err == nil {
			return data, SourceUser, nil
		} else if !errors.Is(err, fs.ErrNotExist) {
			return nil, "", fmt.Errorf("read user template %s: %w", path, err)
		}
	}

	embedPath := filepath.ToSlash(filepath.Join("files", generator, file))
	if data, err := builtinFS.ReadFile(embedPath); err == nil {
		return data, SourceBuiltin, nil
	} else if !errors.Is(err, fs.ErrNotExist) {
		return nil, "", fmt.Errorf("read builtin template %s: %w", embedPath, err)
	}

	return nil, "", fmt.Errorf("template %s/%s: %w", generator, file, fs.ErrNotExist)
}
