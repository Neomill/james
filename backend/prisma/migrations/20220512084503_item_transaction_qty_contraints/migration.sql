-- This is an empty migration.


ALTER TABLE `ItemTransaction` ADD CONSTRAINT it_qty_check CHECK (qty >= 0);
