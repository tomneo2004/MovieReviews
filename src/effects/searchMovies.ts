import useSWR from 'swr';
import axios from 'axios';
import {ISearchMovieData} from '../utils/apiModelTypes';

const apiRoute = `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/api/search/movies`;

const fetcher = async (url:string)=>{
    
    const resp = await axios.get(url);
    const data: ISearchMovieData = resp.data;
    return data;
}

export interface ISearchMovies{
    data: ISearchMovieData | null;
    error: any | null;
}

/**
 * Side effect for search movies by keywords
 * @param keyword search keyword
 * @param page page to display
 */
export function useSearchMovies(keyword:string = '', page:number = 1):ISearchMovies{

    const {data, error} = useSWR(()=>`${apiRoute}?query=${keyword}&page=${page}`, fetcher);

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
