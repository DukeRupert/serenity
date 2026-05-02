// Package generate is the render layer that drives Serenity's generators. It
// sits above internal/templates (which only resolves bytes) and below the CLI
// commands (which collect user input). The Data struct captured here is the
// single payload every template is executed against.
package generate

import "github.com/DukeRupert/serenity/internal/project"

// Data is the value passed to text/template Execute for every init template.
// Fields here are the only knobs templates may interpolate; adding a new field
// is the deliberate way to expose a new degree of variability.
type Data struct {
	ProjectName     string
	Module          string
	SerenityVersion string
	Stack           project.Stack
}
