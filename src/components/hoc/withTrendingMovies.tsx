import React from "react";
import useSWR from 'swr';
import axios from 'axios';

export interface ITrendingMovieData{
    poster_path: string | null;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string | null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

/**
 * Wrapped component must extends props from this 
 * in order to receive popular movie's data
 */
export interface ITrendingMoviesProps {
    trendingMovies: ITrendingMovieData[];
    errorMessage?: string;
}

interface IProps {
    [key:string]:any;
    timeWindow?:'day'|'week';
}

const apiRoute = `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/api/trending/movies`;

const fetcher = async (url:string)=>{
     const resp = await axios.get(url);
     const data: ITrendingMovieData[] = resp.data.results;
     return data;
}

/**
 * A higher order component that is responsible for
 * fetching trending movies' data
 * 
 * @param WrappedComponent React component that take popular movie data.
 * This component's props must extends IPopularMoviesProps inorder to 
 * receive popular movies' data 
 */
export default function WithTrendingMovies(
    WrappedComponent:React.ComponentType<ITrendingMoviesProps>){

    return (props:IProps)=>{
        const {
            timeWindow = 'day'
        } = props;
        
        const newAPIRoute = `${apiRoute}?timeWindow=${timeWindow}`;
        const {data, error} = useSWR(newAPIRoute, fetcher);

        let errorMsg = null;
        if(error){
            console.log(error.status_message);
            errorMsg = error.message;
        }

        return (<WrappedComponent trendingMovies={data} errorMessage={errorMsg} {...props} />);
    }

} 