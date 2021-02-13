import urljoin from "url-join";

/**
 * Take a query string relative to original api service and build full query path to service
 *
 * @param relQueryString query string relative to original api service
 * @param movieAPIService original api service
 * @param apiVersion verison of orignal api service
 */
function buildQuery(
  relQueryString: string,
  movieAPIService: string,
  apiVersion: string
) {
  const query = urljoin(movieAPIService, apiVersion, relQueryString);

  return query;
}

/**
 * Take a query string and add api key to it
 *
 * @param queryString query string
 * @param apiKey api key
 *
 * @return a query string with api_key parameter added to it
 */
function addAPIKey(queryString: string, apiKey: string) {
  const query = urljoin(queryString, `?api_key=${apiKey}`);

  return query;
}

export interface IParams {
  [key: string]: string;
  page?: string;
  language?: string;
  region?: string;
}

export const defaultParams: IParams = {
  page: "1",
  language: "en-US",
  region: "US",
};

/**
 *  take query string and add query parameters to it
 *
 * @param queryString  query string
 * @param params
 */
function addQueryParams(queryString: string, params: IParams = defaultParams) {
  let buildQuery = queryString;

  for (let property in params) {
    if (params[property]) {
      buildQuery = urljoin(buildQuery, `&${property}=${params[property]}`);
    }
  }

  return buildQuery;
}

/**
 * build full path query to api service
 *
 * @param relQueryString relative query path to original api service
 * @param params params to be added to query, default is provided if not given
 * @param apiService path to original api service
 * @param apiVersion verison of api
 * @param apiKey api key
 *
 * @return a built query string
 */
export function buildAPIQuery(
  relQueryString: string,
  apiService: string,
  apiVersion: string,
  apiKey: string,
  params: IParams = defaultParams
) {
  let fullPathQuery = buildQuery(relQueryString, apiService, apiVersion);
  fullPathQuery = addAPIKey(fullPathQuery, apiKey);
  fullPathQuery = addQueryParams(fullPathQuery, params);

  return fullPathQuery;
}
