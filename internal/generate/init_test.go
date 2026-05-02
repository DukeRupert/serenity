package generate_test

import (
	"os"
	"os/exec"
	"path/filepath"
	"testing"

	"github.com/DukeRupert/serenity/internal/generate"
	"github.com/DukeRupert/serenity/internal/project"
)

// TestInit_GeneratesBuildableProject is the gate from framework-plan.md
// § "Template testing": run the generator into a temp dir, then build and
// test the result. If a generator change rots the templates, this fails
// before merge.
//
// Skipped when `go` isn't on PATH (we'd be unable to compile the output
// anyway) or under -short, since pulling dependencies through the module
// cache makes a cold run network-bound.
func TestInit_GeneratesBuildableProject(t *testing.T) {
	if _, err := exec.LookPath("go"); err != nil {
		t.Skip("go toolchain not on PATH")
	}
	if testing.Short() {
		t.Skip("skipping init build under -short")
	}

	outDir := filepath.Join(t.TempDir(), "fixture")
	if err := generate.Init(generate.InitOptions{
		OutDir:      outDir,
		ProjectName: "fixture",
		Module:      "example.com/fixture",
	}); err != nil {
		t.Fatalf("Init: %v", err)
	}

	cfg, err := project.Load(outDir)
	if err != nil {
		t.Fatalf("load serenity.toml: %v", err)
	}
	if err := cfg.Validate(); err != nil {
		t.Fatalf("serenity.toml validation: %v", err)
	}
	if cfg.Module != "example.com/fixture" {
		t.Fatalf("module = %q, want example.com/fixture", cfg.Module)
	}

	if out, _, err := generate.MaybeGoModTidy(outDir); err != nil {
		t.Fatalf("go mod tidy: %v\n%s", err, out)
	}
	if out, err := runIn(outDir, "go", "build", "./..."); err != nil {
		t.Fatalf("go build: %v\n%s", err, out)
	}
	if out, err := runIn(outDir, "go", "test", "./..."); err != nil {
		t.Fatalf("go test: %v\n%s", err, out)
	}
}

func TestInit_RefusesNonEmptyDir(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "stray.txt"), []byte("hi"), 0o644); err != nil {
		t.Fatal(err)
	}
	err := generate.Init(generate.InitOptions{
		OutDir:      dir,
		ProjectName: "fixture",
		Module:      "example.com/fixture",
	})
	if err == nil {
		t.Fatal("expected error for non-empty dir, got nil")
	}
}

func TestInit_RefusesExistingSerenityProject(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, project.Filename), []byte(""), 0o644); err != nil {
		t.Fatal(err)
	}
	err := generate.Init(generate.InitOptions{
		OutDir:      dir,
		ProjectName: "fixture",
		Module:      "example.com/fixture",
	})
	if err == nil {
		t.Fatal("expected error when serenity.toml already exists, got nil")
	}
}

func runIn(dir, name string, args ...string) ([]byte, error) {
	cmd := exec.Command(name, args...)
	cmd.Dir = dir
	return cmd.CombinedOutput()
}
