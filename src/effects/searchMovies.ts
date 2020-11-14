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

export function useSearchMovies(keyword:string = ''):ISearchMovies{

    const {data, error} = useSWR(()=>`${apiRoute}?query=${keyword}`, fetcher);

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
