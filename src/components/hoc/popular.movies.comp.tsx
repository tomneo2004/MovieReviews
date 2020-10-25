import React from "react";
import useSWR from 'swr';
import axios from 'axios';

export interface IPopularMovieData{
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
export interface IPopularMoviesProps {
    popularMovies: IPopularMovieData[];
    errorMessage?: string;
}

interface IProps {
    [key:string]:any;
}

const apiRoute = `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/api/popular/movies`;

const fetcher = async (url:string)=>{
     const resp = await axios.get(url);
     const data: IPopularMovieData[] = resp.data.results;
     return data;
}

/**
 * A higher order component that is responsible for
 * fetching popular movies' data
 * 
 * @param WrappedComponent React component that take popular movie data.
 * This component's props must extends IPopularMoviesProps inorder to 
 * receive popular movies' data 
 */
export default function WithPopularMovies(WrappedComponent:React.ComponentType<IPopularMoviesProps>){
    return (props:IProps)=>{
        
        const {data, error} = useSWR(apiRoute, fetcher);

        let errorMsg = null;
        if(error){
            console.log(error.status_message);
            errorMsg = error.message;
        }

        return (<WrappedComponent popularMovies={data} errorMessage={errorMsg} {...props} />);
    }

} 