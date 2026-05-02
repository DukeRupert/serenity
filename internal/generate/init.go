package generate

import (
	"errors"
	"fmt"
	"os"
	"os/exec"

	"github.com/DukeRupert/serenity/internal/project"
	"github.com/DukeRupert/serenity/internal/version"
)

// InitOptions are the parameters `serenity init` collects from the user. The
// generated project's stack choices are not exposed here yet; Milestone 1
// hardcodes the most common shape (web + SQLite + auth + jobs + mail). The
// 6-8 question prompt from the plan lands in a later milestone, on top of
// this same Init function.
type InitOptions struct {
	OutDir      string
	ProjectName string
	Module      string
}

// Init runs the `init` generator. It refuses to write into a non-empty target
// directory or one that already contains a serenity.toml.
func Init(opts InitOptions) error {
	if err := checkOutDir(opts.OutDir); err != nil {
		return err
	}
	data := Data{
		ProjectName:     opts.ProjectName,
		Module:          opts.Module,
		SerenityVersion: version.Version,
		Stack:           milestoneOneStack(),
	}
	return Render("init", opts.OutDir, data)
}

// milestoneOneStack returns the fixed shape Milestone 1 generates. Exposed as
// a function so tests and future prompt-driven flows can compare against it.
func milestoneOneStack() project.Stack {
	return project.Stack{
		Type:     project.TypeWeb,
		Database: project.DBSQLite,
		Auth:     true,
		Jobs:     true,
		Mailer:   project.MailerPostmark,
		Sentry:   true,
		UI:       project.UI{Layer: project.UIFlint},
	}
}

func checkOutDir(dir string) error {
	info, err := os.Stat(dir)
	if errors.Is(err, os.ErrNotExist) {
		return nil
	}
	if err != nil {
		return fmt.Errorf("stat %s: %w", dir, err)
	}
	if !info.IsDir() {
		return fmt.Errorf("%s exists and is not a directory", dir)
	}
	entries, err := os.ReadDir(dir)
	if err != nil {
		return fmt.Errorf("read %s: %w", dir, err)
	}
	if len(entries) == 0 {
		return nil
	}
	for _, e := range entries {
		if e.Name() == project.Filename {
			return fmt.Errorf("%s already exists in %s — re-running init on a Serenity project is not yet supported (planned: serenity update)", project.Filename, dir)
		}
	}
	return fmt.Errorf("directory %s is not empty", dir)
}

// MaybeGoModTidy runs `go mod tidy` in dir when the go toolchain is on PATH.
// It returns ran=false (with no error) when go is missing, so callers can warn
// rather than fail the whole init.
func MaybeGoModTidy(dir string) (output []byte, ran bool, err error) {
	if _, lookErr := exec.LookPath("go"); lookErr != nil {
		return nil, false, nil
	}
	cmd := exec.Command("go", "mod", "tidy")
	cmd.Dir = dir
	out, err := cmd.CombinedOutput()
	return out, true, err
}
