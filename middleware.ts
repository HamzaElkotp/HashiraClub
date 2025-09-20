import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req: Request) {
  const url = new URL(req.url);
  const hostname = req.headers.get("host") || "";

  // Base environment domain → e.g. "dev.hashiraclub.com" or "staging.hashiraclub.com" or "hashiraclub.com"
  const baseDomain = new URL(process.env.NEXT_PUBLIC_ORIGIN!).hostname;

  // Remove the base domain from the end of the hostname
  // Example: "auth.dev.hashiraclub.com".replace(".dev.hashiraclub.com", "") → "auth"
  let subdomain = "";
  if (hostname === baseDomain || hostname === `www.${baseDomain}`) {
    // no tenant (root env domain)
    return NextResponse.next();
  } else if (hostname.endsWith(`.${baseDomain}`)) {
    subdomain = hostname.replace(`.${baseDomain}`, "");
  }

  // If still no subdomain → just continue
  if (!subdomain) {
    return NextResponse.next();
  }

  // Rewrite to /{tenant}/path
  return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
}
