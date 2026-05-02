package cli

import "github.com/spf13/cobra"

// Tier 3 — occasional / nice-to-haves.
func registerTier3(root *cobra.Command) {
	registerStubs(root, []stub{
		{
			use:       "make:admin",
			short:     "Generate a minimal admin panel for a resource",
			milestone: "Tier 3",
		},
		{
			use:       "make:client",
			args:      "<name>",
			short:     "Generate a typed HTTP client for an external API",
			milestone: "Tier 3",
		},
		{
			use:       "make:cli",
			args:      "<name>",
			short:     "Add a cobra subcommand to the project's CLI binary",
			milestone: "Tier 3",
		},
		{
			use:       "make:cron",
			args:      "<name>",
			short:     "Generate a scheduled River job with cron syntax + registration",
			milestone: "Tier 3",
		},
	})
}
