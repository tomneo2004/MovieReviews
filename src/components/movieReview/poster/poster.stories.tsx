import React from 'react';
import Poster from './poster';

export default {
  title: 'Poster',
};

export const Default = () => {
    return (
        <Poster
        imageURL={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
        imageWidth={154}
        minWidth={154}
        maxWidth={154}
        title='This is a movie title'
        releaseDate='04 Oct 2020'
        />
    )
}

export const RatingGood = () => {
  return (
      <Poster
      imageURL={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
      imageWidth={154}
      minWidth={154}
      maxWidth={154}
      title='This is a movie title'
      releaseDate='04 Oct 2020'
      ratingScore={80}
      ratingOffsetX={-5}
      ratingOffsetY={-5}
      />
  )
}

export const RatingAverage = () => {
  return (
      <Poster
      imageURL={`https://image.tmdb.org/t/p/w200//h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg`}
      imageWidth={154}
      minWidth={154}
      maxWidth={154}
      title='This is a movie title'
      releaseDate='04 Oct 2020'
      ratingScore={50}
      ratingOffsetX={-5}
      ratingOffsetY={-5}
      />
  )
}

export const RatingBad = () => {
  return (
      <Poster
      imageURL={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
      imageWidth={154}
      minWidth={154}
      maxWidth={154}
      title='This is a movie title'
      releaseDate='04 Oct 2020'
      ratingScore={20}
      ratingOffsetX={-5}
      ratingOffsetY={-5}
      />
  )
}

export const Placeholder = () => {
  return (
      <Poster
      // imageURL={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
      imageWidth={154}
      minWidth={154}
      maxWidth={154}
      title='This is a movie title'
      releaseDate='04 Oct 2020'
      ratingScore={20}
      ratingOffsetX={-5}
      ratingOffsetY={-5}
      />
  )
}