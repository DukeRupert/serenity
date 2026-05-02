package cli

import (
	"github.com/spf13/cobra"

	"github.com/DukeRupert/serenity/internal/version"
)

func newRootCmd() *cobra.Command {
	root := &cobra.Command{
		Use:           "serenity",
		Short:         "Serenity — a code generator for Logan's Go web stack",
		Long:          "Serenity bootstraps Go web projects and scaffolds features (resources, pages, jobs, etc.) for a fixed, opinionated stack. The generated code is the application; Serenity has no runtime presence.",
		Version:       version.Version,
		SilenceErrors: true,
		SilenceUsage:  true,
	}

	registerTier1(root)
	registerTier2(root)
	registerTier3(root)
	registerTier4(root)

	return root
}

func Execute() error {
	return newRootCmd().Execute()
}
