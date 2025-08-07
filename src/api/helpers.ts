export function injectQueryParams(
  route: string,
  params: Record<string, string | undefined> = {}
) {
  const filteredParams: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value == null) continue;
    filteredParams[key] = value;
  }

  const query = new URLSearchParams(filteredParams);

  if (query.size === 0) {
    return route;
  }

  const separator = route.includes("?") ? "&" : "?";
  return `${route}${separator}${query.toString()}`;
}
