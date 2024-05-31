import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const UrlTable = pgTable("short-url_url", {
    shortUrl: uuid("shortUrl").primaryKey().defaultRandom(),
    originalUrl: varchar("originalUrl", { length: 512 }).notNull().unique(),
});
