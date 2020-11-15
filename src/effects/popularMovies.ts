import useSWR from 'swr';
import axios from 'axios';
import {IMovieData} from '../utils/apiModelTypes';

const apiRoute = `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/api/popular/movies`;

const fetcher = async (url:string)=>{

    const resp = await axios.get(url);
    const data: IMovieData[] = resp.data.results;
    return data;
}

export interface IPopularMovies{
    data: IMovieData[] | null;
    error: any | null;
}

/**
 * Side effect for fetching popular movies
 */
export function usePopularMovies():IPopularMovies{
    const {data, error} = useSWR(apiRoute, fetcher);

    if(error){
        console.log(error);
        return {
            data: null,
            error,
        }
    }

    return {
        data,
        error: null,
    }
}