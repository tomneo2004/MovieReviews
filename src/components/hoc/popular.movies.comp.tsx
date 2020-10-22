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

export interface IPopularMoviesProps {
    popularMovies?: IPopularMovieData[];
}

const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
const apiRoute = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const fetcher = async (url:string)=>{
     const resp = await axios.get(url);
     const data: IPopularMovieData[] = resp.data.results;
     return data;
}

export default function withPopularMovies(WrappedComponent:React.ComponentType<IPopularMoviesProps>){
    return (props:IPopularMoviesProps)=>{
        
        const {data, error} = useSWR(apiRoute, fetcher);

        if(error) throw new Error(error.message);

        return (<WrappedComponent popularMovies={data} {...props} />);
    }

} 