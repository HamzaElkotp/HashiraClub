import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

const VALID_TENANTS = ["hashira-entrance", "auth", "myaccount"];

export default function middleware(req: Request) {
  const url = new URL(req.url);
  const hostHeader = req.headers.get("host") || "";
  const hostNoPort = hostHeader.replace(/:\d+$/, ""); // remove port for localhost

  // Normalize NEXT_PUBLIC_ORIGIN
  const originEnv = process.env.NEXT_PUBLIC_ORIGIN || "";
  let baseHost = "";
  try {
    baseHost = new URL(originEnv).hostname;
  } catch {
    baseHost = new URL(`http://${originEnv}`).hostname;
  }

  // 1) Root domain
  if (hostNoPort === baseHost || hostNoPort === `www.${baseHost}`) {
    // 🚫 Prevent accessing tenant via path (e.g. /auth, /myaccount)
    const pathSegment = url.pathname.split("/")[1];
    if (VALID_TENANTS.includes(pathSegment)) {
      return new NextResponse("Not Found", { status: 404 });
    }
    return NextResponse.next();
  }

  // 2) Tenant subdomain
  if (hostNoPort.endsWith(`.${baseHost}`)) {
    const subdomain = hostNoPort.replace(`.${baseHost}`, "");

    if (!VALID_TENANTS.includes(subdomain)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.rewrite(
      new URL(`/${subdomain}${url.pathname}${url.search}`, req.url)
    );
  }

  // 3) Otherwise → 404
  return new NextResponse("Not Found", { status: 404 });
}
