package templates

import "embed"

// builtinFS holds every template compiled into the Serenity binary. Generators
// resolve to this filesystem only after project- and user-level overrides miss.
//
//go:embed all:files
var builtinFS embed.FS

// BuiltinFS exposes the embedded template tree for callers (mainly Loader).
// Paths inside the FS are rooted at "files/<generator>/<template>".
func BuiltinFS() embed.FS { return builtinFS }
