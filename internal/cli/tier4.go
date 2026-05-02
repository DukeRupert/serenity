package cli

import "github.com/spf13/cobra"

// Tier 4 — agent affordances. Per the plan these are interleaved early in the
// build order because they're the differentiating layer.
func registerTier4(root *cobra.Command) {
	registerStubs(root, []stub{
		{
			use:       "agent:context",
			short:     "Emit a markdown briefing of the current project for a coding agent",
			milestone: "Milestone 5",
		},
		{
			use:       "agent:check",
			short:     "Run static checks that catch common agent mistakes (returns JSON)",
			milestone: "Tier 4",
		},
		{
			use:       "agent:diff",
			short:     "Show the files a generator would touch, without writing them",
			milestone: "Tier 4",
		},
	})
}
