package main

import (
	"fmt"
	"os"

	"github.com/DukeRupert/serenity/internal/cli"
)

func main() {
	if err := cli.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, "serenity:", err)
		os.Exit(1)
	}
}
