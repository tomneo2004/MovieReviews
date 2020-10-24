import React from 'react';
import MoviePoster from './movie.poster.comp';
import CircularRating from '../rating.circular/rating.circular.comp';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

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

export const RatingGood = () => {
  return (
      <MoviePoster
      imageURL={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
      imageWidth={154}
      title='This is a movie title'
      screenDate='04 Oct 2020'
      rating={
        <CircularRating valueFlexDirection='column'
        value={100} valueFontWeight={600} valueFontSize='1em'
        valueEndAdornment={<ThumbUpIcon style={{width:'15px',height:'15px'}} />}
        />
      }
      />
  )
}

export const RatingAverage = () => {
  return (
      <MoviePoster
      imageURL={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
      imageWidth={154}
      title='This is a movie title'
      screenDate='04 Oct 2020'
      rating={
        <CircularRating valueFlexDirection='column'
        value={64} valueFontWeight={600} valueFontSize='1em'
        valueEndAdornment={<ThumbUpDownIcon style={{width:'15px',height:'15px'}} />}
        />
      }
      />
  )
}

export const RatingBad = () => {
  return (
      <MoviePoster
      imageURL={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
      imageWidth={154}
      title='This is a movie title'
      screenDate='04 Oct 2020'
      rating={
        <CircularRating valueFlexDirection='column'
        value={20} valueFontWeight={600} valueFontSize='1em'
        valueEndAdornment={<ThumbDownIcon style={{width:'15px',height:'15px'}} />}
        />
      }
      />
  )
}