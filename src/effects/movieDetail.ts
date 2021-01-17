
import useSWR from 'swr';
import axios from 'axios';
import {IMovieDetailData} from '../utils/api/model/apiModelTypes';

const apiRoute = `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/api/detail/movies`;

const fetcher = async (url:string)=>{

    const resp = await axios.get(url);
    const data: IMovieDetailData = resp.data;
    return data;
}

export interface IDetailMovies{
    data: IMovieDetailData | null;
    error: any | null;
}

/**
 * Side effect for fetching movie detail
 */
export function useMovieDetail(id:number):IDetailMovies{
    const {data, error} = useSWR(()=>`${apiRoute}?id=${id}`, fetcher);

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