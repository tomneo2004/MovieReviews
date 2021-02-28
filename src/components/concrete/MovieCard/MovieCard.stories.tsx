import React from "react";
import Poster from "./MovieCard";

export default {
  title: "Movie Card",
};

export const Default = () => {
  return (
    <Poster
    cardWidth={200}
      src={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
      title="This is a movie title"
      releaseDate="04 Oct 2020"
    />
  );
};

export const RatingGood = () => {
  return (
    <Poster
    cardWidth={200}
      src={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
      title="This is a movie title"
      releaseDate="04 Oct 2020"
      ratingScore={80}
      ratingOffsetX={-5}
      ratingOffsetY={-5}
    />
  );
};

export const RatingAverage = () => {
  return (
    <Poster
    cardWidth={200}
      src={`https://image.tmdb.org/t/p/w200//h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg`}
      title="This is a movie title"
      releaseDate="04 Oct 2020"
      ratingScore={50}
      ratingOffsetX={-5}
      ratingOffsetY={-5}
    />
  );
};

export const RatingBad = () => {
  return (
    <Poster
    cardWidth={200}
      src={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
      title="This is a movie title"
      releaseDate="04 Oct 2020"
      ratingScore={20}
      ratingOffsetX={-5}
      ratingOffsetY={-5}
    />
  );
};

export const FixedHeight = () => {
  return (
    <Poster
    cardWidth={200}
      height={100}
      src={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
      title="This is a movie title and this is pretty long title as well you see"
      releaseDate="04 Oct 2020"
      ratingScore={20}
      ratingOffsetX={-5}
      ratingOffsetY={-5}
    />
  );
};

export const FixedTitleHeight = () => {
  return (
    <Poster
    cardWidth={200}
      src={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
      title="This is a movie title and this is pretty long title as well you see"
      titleMaxHeight={40}
      releaseDate="04 Oct 2020"
      ratingScore={20}
      ratingOffsetX={-5}
      ratingOffsetY={-5}
    />
  );
};
