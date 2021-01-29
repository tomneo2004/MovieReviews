export enum RouteType {
    'home' = '/',
    'search' = '/search',
    'movie' = '/movie',
}

export const getRoute = (type:RouteType, params:{[key:string]:string})=>{
    let routePath = `${type}`;
    const query = Object.keys(params).reduce((pre, current, index)=>{
        if(!index) return pre += `?${current}=${params[current]}`;
        return pre += `&${current}=${params[current]}`;

    }, '');
    return routePath + query;
}