package cli

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"

	"github.com/spf13/cobra"

	"github.com/DukeRupert/serenity/internal/generate"
)

func newInitCmd() *cobra.Command {
	var module string
	cmd := &cobra.Command{
		Use:   "init <project>",
		Short: "Bootstrap a new Go web project with the full stack pre-wired",
		Long: "Generates a new Go web project under ./<project>/, pre-wired with " +
			"the Milestone 1 shape: stdlib http.ServeMux router, SQLite via goose " +
			"+ sqlc, auth primitives (argon2, sessions, middleware), goqite jobs, " +
			"a pluggable mailer (Postmark default), Sentry, /healthz, /metrics, " +
			"plus the Caddy/Docker/GitHub Actions deploy pipeline.",
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			name := args[0]
			if err := validateProjectName(name); err != nil {
				return err
			}
			if err := validateModulePath(module); err != nil {
				return err
			}
			cwd, err := os.Getwd()
			if err != nil {
				return fmt.Errorf("getwd: %w", err)
			}
			outDir := filepath.Join(cwd, name)
			if err := generate.Init(generate.InitOptions{
				OutDir:      outDir,
				ProjectName: name,
				Module:      module,
			}); err != nil {
				return err
			}
			out := cmd.OutOrStdout()
			errOut := cmd.ErrOrStderr()
			fmt.Fprintf(out, "created %s\n", outDir)
			tidyOut, ran, tidyErr := generate.MaybeGoModTidy(outDir)
			switch {
			case tidyErr != nil:
				fmt.Fprintf(errOut, "warning: `go mod tidy` failed: %v\n%s\n", tidyErr, tidyOut)
			case !ran:
				fmt.Fprintln(errOut, "warning: `go` not on PATH — skipped `go mod tidy`")
			}
			fmt.Fprintf(out, "\nNext steps:\n  cd %s\n  cp .env.example .env\n  go run ./cmd/server\n", name)
			return nil
		},
	}
	cmd.Flags().StringVar(&module, "module", "", "Go module path for the new project (e.g. github.com/you/project)")
	_ = cmd.MarkFlagRequired("module")
	return cmd
}

// projectNameRe enforces a friendly, filesystem-safe directory name. Lower
// case to keep imports / paths predictable; leading char must be alnum so the
// name never starts with `.` or `-`.
var projectNameRe = regexp.MustCompile(`^[a-z0-9][a-z0-9_-]{0,62}$`)

// modulePathRe is a sanity check, not a full Go module-path validator. The Go
// toolchain itself rejects bad paths during `go mod tidy`; this catches the
// obvious cases up front so the user gets a clear error before any files land.
var modulePathRe = regexp.MustCompile(`^[a-zA-Z0-9][a-zA-Z0-9._~-]*(/[a-zA-Z0-9._~-]+)+$`)

func validateProjectName(name string) error {
	if !projectNameRe.MatchString(name) {
		return fmt.Errorf("project name %q is invalid (use lowercase letters, digits, hyphens, underscores; must start with a letter or digit; up to 63 chars)", name)
	}
	return nil
}

func validateModulePath(m string) error {
	if !modulePathRe.MatchString(m) {
		return fmt.Errorf("module path %q does not look like a Go module path (e.g. github.com/you/project)", m)
	}
	return nil
}
