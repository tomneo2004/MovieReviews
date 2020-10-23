import React from 'react';
import MoviePoster from './movie.poster.comp';

export default {
  title: 'MoviePoster',
};

export const Default = () => {
    return (
        <MoviePoster
        imageURL={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
        imageWidth={154}
        title='This is a movie title'
        screenDate='04 Oct 2020'
        />
    )
}