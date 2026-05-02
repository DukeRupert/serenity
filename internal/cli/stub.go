package cli

import (
	"fmt"

	"github.com/spf13/cobra"
)

// stub describes a command that is part of the planned surface but not yet
// implemented. Registering all of them keeps `serenity --help` honest about
// the eventual shape of the CLI even before the underlying generators land.
type stub struct {
	use       string
	args      string // positional argument hint shown in Use, e.g. "<Name>"
	short     string
	milestone string // human-readable milestone reference from framework-plan.md
}

func (s stub) command() *cobra.Command {
	use := s.use
	if s.args != "" {
		use = s.use + " " + s.args
	}
	return &cobra.Command{
		Use:   use,
		Short: s.short,
		RunE: func(cmd *cobra.Command, args []string) error {
			return fmt.Errorf("%s is not yet implemented (planned: %s)", s.use, s.milestone)
		},
	}
}

func registerStubs(parent *cobra.Command, stubs []stub) {
	for _, s := range stubs {
		parent.AddCommand(s.command())
	}
}
