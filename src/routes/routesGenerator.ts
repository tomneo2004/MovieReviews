export enum RouteType {
  "home" = "/",
  "search" = "/search",
  "movie" = "/movie",
  "movie video" = "/movie/media/videos",
  "movie poster" = "/movie/media/posters",
}

/**
 * get the route as string
 *
 * @param {RouteType} type type of route that was defined
 * @param params route params to pass to route, given null to no params
 * @param dynamic if route is dynamic. default is `''`
 *
 * check on https://nextjs.org/docs/routing/dynamic-routes for dynamic route
 */
export const getRoute = (
  type: RouteType,
  params: { [key: string]: string },
  dynamic: string = ""
) => {
  const dynamicPath = dynamic ? `/${dynamic}` : "";
  let routePath = `${type}${dynamicPath}`;

  let routeParams = "";
  if (params) {
    routeParams = Object.keys(params).reduce((pre, current, index) => {
      if (!index) return (pre += `?${current}=${params[current]}`);
      return (pre += `&${current}=${params[current]}`);
    }, "");
  }

  return routePath + routeParams;
};
