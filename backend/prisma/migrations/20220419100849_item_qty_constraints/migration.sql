-- This is an empty migration.


ALTER TABLE `Item` ADD CONSTRAINT qty_check CHECK (qty >= 0);
