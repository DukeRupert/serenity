package cli

import "github.com/spf13/cobra"

// Tier 2 — used monthly.
func registerTier2(root *cobra.Command) {
	registerStubs(root, []stub{
		{
			use:       "make:component",
			args:      "<name>",
			short:     "Generate a templ component, optionally with Alpine state",
			milestone: "Tier 2",
		},
		{
			use:       "make:migration",
			args:      "<name>",
			short:     "Generate a goose migration file with the project's naming convention",
			milestone: "Tier 2",
		},
		{
			use:       "make:auth",
			short:     "Generate the auth scaffold (sessions, argon2, login/register/reset flows)",
			milestone: "Tier 2",
		},
		{
			use:       "make:mailable",
			args:      "<name>",
			short:     "Generate a provider-agnostic mailable + templ HTML/text templates",
			milestone: "Tier 2",
		},
		{
			use:       "make:webhook",
			args:      "<name>",
			short:     "Generate an inbound webhook handler with signature verification and idempotency",
			milestone: "Tier 2",
		},
	})
}
