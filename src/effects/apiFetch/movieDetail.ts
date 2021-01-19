
import useSWR from 'swr';
import axios from 'axios';
import {IMovieDetailData} from '../../utils/api/model/apiModelTypes';
import {IFetchResponse} from './fetchResponse';

const apiRoute = `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/api/detail/movies`;

const fetcher = async (url:string)=>{

    const resp = await axios.get(url);
    const data: IMovieDetailData = resp.data;
    return data;
}

/**
 * Side effect for fetching movie detail
 */
export function useMovieDetail(id:number):IFetchResponse<IMovieDetailData>{

    const {data, error} = useSWR(
        id?()=>`${apiRoute}?id=${id}`:null, 
        fetcher);

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