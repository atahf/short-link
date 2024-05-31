import { FindByOriginalUrl, FindByShortUrl, Insert } from "@/drizzle/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const shortUrl = req.nextUrl.searchParams.get("u");
    if (!shortUrl) {
        return NextResponse.json({}, { status: 400 });
    }

    const res = await FindByShortUrl(shortUrl);
    if (!res) {
        return NextResponse.json({}, { status: 400 });
    }

    return NextResponse.json({ originalUrl: res[0].originalUrl }, { status: 200 });
}

export async function POST(req: NextRequest) {
    const { url } = await req.json();
    if (!url) {
        return NextResponse.json({ error: "URL missing!" }, { status: 400 });
    }

    let url2add = url;
    const protocolRegex = /^[a-zA-Z0-9]+:\/\//;
    if (!protocolRegex.test(url)) {
        url2add = `//${url}`;
    }

    await Insert(url2add);

    const res = await FindByOriginalUrl(url2add);

    return NextResponse.json({ shortUrl: res[0].shortUrl }, { status: 200 });
}
