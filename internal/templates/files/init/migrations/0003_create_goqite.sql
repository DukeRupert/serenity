-- +goose Up
-- Schema for the goqite-backed jobs queue. Mirrors maragu.dev/goqite's
-- schema_sqlite.sql for the version pinned by go.mod.
-- +goose StatementBegin
CREATE TABLE goqite (
    id TEXT PRIMARY KEY DEFAULT ('m_' || lower(hex(randomblob(16)))),
    created TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ')),
    updated TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ')),
    queue TEXT NOT NULL,
    body BLOB NOT NULL,
    timeout TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ')),
    received INTEGER NOT NULL DEFAULT 0,
    priority INTEGER NOT NULL DEFAULT 0
) STRICT;
-- +goose StatementEnd

-- +goose StatementBegin
CREATE TRIGGER goqite_updated_timestamp AFTER UPDATE ON goqite BEGIN
    UPDATE goqite SET updated = strftime('%Y-%m-%dT%H:%M:%fZ') WHERE id = OLD.id;
END;
-- +goose StatementEnd

CREATE INDEX goqite_queue_priority_created_idx ON goqite (queue, priority DESC, created);

-- +goose Down
DROP INDEX goqite_queue_priority_created_idx;
DROP TRIGGER goqite_updated_timestamp;
DROP TABLE goqite;
