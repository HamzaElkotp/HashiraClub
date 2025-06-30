export function getRootDomain() {
  const { hostname, protocol } = window.location;

  const parts = hostname.split(".");
  let domain = hostname;

  if (hostname.endsWith(".localhost")) {
    domain = "localhost:3000";
  } else if (parts.length > 2) {
    domain = parts.slice(-2).join(".");
  }

  return `${protocol}//${domain}`;
}
