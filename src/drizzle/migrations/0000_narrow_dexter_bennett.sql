CREATE TABLE IF NOT EXISTS "short-url_url" (
	"shortUrl" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"originalUrl" varchar(512) NOT NULL,
	CONSTRAINT "short-url_url_originalUrl_unique" UNIQUE("originalUrl")
);
