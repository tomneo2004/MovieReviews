import urljoin from 'url-join';

const movieAPI = process.env.MOVIE_API_URL;
const movieAPIVersion = process.env.MOVIE_API_VERSION;
const movieAPIKey = process.env.MOVIE_API_KEY;
const imageAPI = process.env.NEXT_PUBLIC_API_IMAGE_ROUTE;

function buildServiceQuery(serviceQuery:string){
    const query = urljoin(
        movieAPI,
        movieAPIVersion,
        serviceQuery,
        `?api_key=${movieAPIKey}`
    );

    return query;
}

export interface IParams {
    [key:string]:string;
    page?:string;
    language?:string;
    region?:string;
}

const defaultParams:IParams = {
    page: '1',
    language: 'en-US',
    region: 'US',
}

function buildDefaultQueryParams(
    serviceQuery:string, params:IParams=defaultParams){
    
    let buildQuery = serviceQuery;

    for(let property in params){
        if(params[property]){
            buildQuery = urljoin(buildQuery, `&${property}=${params[property]}`);
        }
    }

    return buildQuery;
}

export function buildImageQuery(imagePath:string, imageSize:number = 200){
    if(!imagePath) return '';

    const buildQuery = urljoin(
        imageAPI,
        't',
        'p',
        `w${imageSize}`,
        imagePath   
    );

    return buildQuery;
}

/**
 * Get query for popular movie
 * 
 * @param page default 1
 * @param lang  default en-US
 * @param region  default us
 */
export function getPouplarMoviesQuery(params:IParams = defaultParams){
    const serviceQuery = '/movie/popular';

    let buildQuery = buildServiceQuery(serviceQuery);
    buildQuery = buildDefaultQueryParams(buildQuery, params);

    return buildQuery;
}

const trendingMediaType: {[key:string]:boolean} = {
    'all':true,
    'movie':true,
    'tv':true,
    'person':true
}
const trendingTimeWindow: {[key:string]:boolean} = {
    'day':true,
    'week':true
}

/**
 * Get query for trending
 * 
 * @param mediaType  all, movie, tv, person. default movie
 * @param timeWindow  day, week. deault day
 */
export function getTrendingQuery(
    mediaType:string = 'movie', timeWindow:string= 'day', params:IParams = defaultParams){

    if(!trendingMediaType[mediaType]){
        throw Error(`${mediaType} was not match any of ${trendingMediaType}`);
    }
    if(!trendingTimeWindow[timeWindow]){
        throw Error(`${timeWindow} was not match any of ${trendingTimeWindow}`);
    }

    const serviceQuery = `/trending/${mediaType}/${timeWindow}`;

    let buildQuery = buildServiceQuery(serviceQuery);
    buildQuery = buildDefaultQueryParams(buildQuery, params);

    return buildQuery;
}



