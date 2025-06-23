import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: Request) {
  const url = new URL(req.url);
  const hostname =  req.headers.get("host") || "";

  let subdomain = "", domain = hostname;
  let splittedHostname = hostname.split('.');

  if(splittedHostname.length == 1 && hostname.includes("localhost") 
    || (splittedHostname.length == 2 && !hostname.includes("localhost"))){
    return NextResponse.rewrite(new URL( req.url))
  } else if(splittedHostname.length == 2){
    subdomain = splittedHostname[0];
    domain = splittedHostname[1];
  } else if(splittedHostname.length == 3){
    subdomain = splittedHostname[0];
    domain = `${splittedHostname[1]}.${splittedHostname[2]}`;
  } else{
    return new Response(null, { status: 404 });
  }

  // Don't rewrite for root domain
  if (!subdomain || ['www'].includes(subdomain)) {
    return NextResponse.next();
  }
  return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
}