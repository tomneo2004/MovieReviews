import useSWR from 'swr';
import axios from 'axios';
import {IMovieData} from '../../utils/api/model/apiModelTypes';
import {IFetchResponse} from './fetchResponse';

const apiRoute = `${process.env.NEXT_PUBLIC_API_BASE_ROUTE||''}/api/trending/movies`;

const fetcher = async (url:string)=>{
    
    const resp = await axios.get(url);
    const data: IMovieData[] = resp.data.results;
    return data;
}

/**
 * Side effect for fetching trending movies
 * 
 * @param timeWindow either day or week
 */
export function useTrendingMovies(timeWindow:'day'|'week' = 'day'):IFetchResponse<IMovieData[]>{

    const {data, error} = useSWR(()=>{
        if(!timeWindow) return null;
        return `${apiRoute}?timeWindow=${timeWindow}`;
    }, fetcher);

    const isLoading = !data && !error;

    if(error){
        console.log(error);
        return {
            data: null,
            error,
            isLoading
        }
    }

    return {
        data,
        error: null,
        isLoading
    }
}