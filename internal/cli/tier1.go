package cli

import "github.com/spf13/cobra"

// Tier 1 — used weekly. The four commands here are the highest-leverage
// surface and the first targets of the build order in framework-plan.md.
func registerTier1(root *cobra.Command) {
	root.AddCommand(newInitCmd())
	registerStubs(root, []stub{
		{
			use:       "make:resource",
			args:      "<Name>",
			short:     "Generate a complete CRUD vertical slice for a domain entity",
			milestone: "Milestones 2 & 3",
		},
		{
			use:       "make:page",
			args:      "<name>",
			short:     "Generate a static-ish page (handler + route + templ view)",
			milestone: "Tier 1",
		},
		{
			use:       "make:job",
			args:      "<name>",
			short:     "Generate a background job for the project's jobs.Queue",
			milestone: "Milestone 4",
		},
	})
}
