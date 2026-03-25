const rawAllowedRoutes =
  typeof window !== "undefined" ? window.__PUBLISH_ALLOWED_ROUTES__ : undefined;

const allowedRouteSet =
  Array.isArray(rawAllowedRoutes) && rawAllowedRoutes.length > 0
    ? new Set(rawAllowedRoutes.map((v) => String(v)))
    : null;

export function isPublishRestricted() {
  return !!allowedRouteSet;
}

export function isRouteAllowed(pathname) {
  const p = String(pathname || "");
  if (!allowedRouteSet) return true;
  return allowedRouteSet.has(p);
}

export function filterPublishedRoutes(routeItems = []) {
  if (!allowedRouteSet) return routeItems;
  return routeItems.filter((r) => isRouteAllowed(r.path));
}
