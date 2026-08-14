import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT; // e.g. "ca-pub-1234567890123456"
  const pubId = client?.replace("ca-pub-", "");

  const body = pubId
    ? `google.com, pub-${pubId}, DIRECT, f08c47fec0942fa0`
    : "# Add NEXT_PUBLIC_ADSENSE_CLIENT to your environment to populate ads.txt";

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
