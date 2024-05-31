import db from "./db";
import { UrlTable } from "./schema";
import { eq } from "drizzle-orm";

export async function Insert(originalUrl: string) {
    const existing = await FindByOriginalUrl(originalUrl);

    if (existing.length > 0) {
        return existing;
    }

    await db.insert(UrlTable).values({ originalUrl: originalUrl });
}

export async function FindByShortUrl(shortUrl: string) {
    const res = await db
        .select()
        .from(UrlTable)
        .where(eq(UrlTable.shortUrl, shortUrl))
        .limit(1);
    
    return res;
}

export async function FindByOriginalUrl(originalUrl: string) {
    const res = await db
        .select()
        .from(UrlTable)
        .where(eq(UrlTable.originalUrl, originalUrl))
        .limit(1);
    
    return res;
}
