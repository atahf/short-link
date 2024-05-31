import { FindByShortUrl } from "@/drizzle/actions";
import { redirect } from "next/navigation";

export default async function Redirect({
    params,
}: {
    params: { shortUrl: string };
}) {
    const url = await FindByShortUrl(params.shortUrl);
    redirect(url[0].originalUrl);
}
