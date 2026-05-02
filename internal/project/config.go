// Package project models the per-project metadata Serenity records inside a
// generated codebase. The on-disk form is `serenity.toml` at the project root;
// future `serenity update:*` commands read it to determine the merge base and
// the variant of templates that produced the project.
package project

import (
	"bytes"
	"errors"
	"fmt"
	"os"
	"path/filepath"

	"github.com/BurntSushi/toml"
)

const Filename = "serenity.toml"

// Project type values.
const (
	TypeWeb  = "web"
	TypeAPI  = "api"
	TypeBoth = "both"
)

// Database values.
const (
	DBSQLite   = "sqlite"
	DBPostgres = "postgres"
)

// Mailer values.
const (
	MailerPostmark = "postmark"
	MailerSendGrid = "sendgrid"
	MailerSES      = "ses"
	MailerSMTP     = "smtp"
	MailerNone     = "none"
)

// UI component layer values.
const (
	UIFlint  = "flint-ui"
	UIBare   = "bare"
	UICustom = "custom"
)

// Config is the in-memory representation of `serenity.toml`.
type Config struct {
	SerenityVersion string `toml:"serenity_version"`
	Module          string `toml:"module"`
	Stack           Stack  `toml:"stack"`
}

// Stack records the answers Serenity collected during `init`.
type Stack struct {
	Type     string `toml:"type"`
	Database string `toml:"database"`
	Auth     bool   `toml:"auth"`
	Jobs     bool   `toml:"jobs"`
	Mailer   string `toml:"mailer"`
	Sentry   bool   `toml:"sentry"`
	UI       UI     `toml:"ui"`
}

// UI captures the chosen component layer plus an optional custom module path.
type UI struct {
	Layer        string `toml:"layer"`
	CustomModule string `toml:"custom_module,omitempty"`
}

// Load reads `<dir>/serenity.toml` into a Config.
func Load(dir string) (Config, error) {
	path := filepath.Join(dir, Filename)
	data, err := os.ReadFile(path)
	if err != nil {
		return Config{}, fmt.Errorf("read %s: %w", path, err)
	}
	var cfg Config
	if err := toml.Unmarshal(data, &cfg); err != nil {
		return Config{}, fmt.Errorf("parse %s: %w", path, err)
	}
	return cfg, nil
}

// Save writes the Config to `<dir>/serenity.toml`, creating the file if needed.
func (c Config) Save(dir string) error {
	path := filepath.Join(dir, Filename)
	var buf bytes.Buffer
	if err := toml.NewEncoder(&buf).Encode(c); err != nil {
		return fmt.Errorf("encode %s: %w", path, err)
	}
	if err := os.WriteFile(path, buf.Bytes(), 0o644); err != nil {
		return fmt.Errorf("write %s: %w", path, err)
	}
	return nil
}

// Validate enforces the closed sets of values the plan defines for each field.
// Anything outside those sets is a project that the generators will not be
// able to drive correctly, so we reject it loudly.
func (c Config) Validate() error {
	if c.Module == "" {
		return errors.New("module is required")
	}
	if c.SerenityVersion == "" {
		return errors.New("serenity_version is required")
	}
	if !oneOf(c.Stack.Type, TypeWeb, TypeAPI, TypeBoth) {
		return fmt.Errorf("stack.type %q must be one of web|api|both", c.Stack.Type)
	}
	if !oneOf(c.Stack.Database, DBSQLite, DBPostgres) {
		return fmt.Errorf("stack.database %q must be one of sqlite|postgres", c.Stack.Database)
	}
	if !oneOf(c.Stack.Mailer, MailerPostmark, MailerSendGrid, MailerSES, MailerSMTP, MailerNone) {
		return fmt.Errorf("stack.mailer %q is not a known provider", c.Stack.Mailer)
	}
	if !oneOf(c.Stack.UI.Layer, UIFlint, UIBare, UICustom) {
		return fmt.Errorf("stack.ui.layer %q must be one of flint-ui|bare|custom", c.Stack.UI.Layer)
	}
	if c.Stack.UI.Layer == UICustom && c.Stack.UI.CustomModule == "" {
		return errors.New("stack.ui.custom_module is required when stack.ui.layer = custom")
	}
	return nil
}

func oneOf(v string, allowed ...string) bool {
	for _, a := range allowed {
		if v == a {
			return true
		}
	}
	return false
}
