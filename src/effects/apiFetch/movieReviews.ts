
import useSWR from 'swr';
import axios from 'axios';
import {IMovieReviewsData} from '../../utils/api/model/apiModelTypes';
import {IFetchResponse} from './fetchResponse';

const apiRoute = `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/api/detail/movies/reviews`;

const fetcher = async (url:string)=>{

    try{
        const resp = await axios.get(url);
        const data: IMovieReviewsData = resp.data;
        return data;
    }
    catch(e){
        return Promise.reject(e);
    }
}

/**
 * Side effect for fetching reviews for movies
 */
export function useMovieReviews(id:number, page:number=1):IFetchResponse<IMovieReviewsData>{
    const {data, error} = useSWR(()=>`${apiRoute}?id=${id}&page=${page}`, fetcher);

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