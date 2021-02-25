import React from "react";
import PosterImage from "./PosterImage";

export default {
  title: "Poster Image",
};

export const Default = () => {
  return (
    <PosterImage
      imageURL={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
    />
  );
};

export const Elevation = () => {
  return (
    <PosterImage
      elevation={4}
      imageURL={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
    />
  );
};

export const ImageWidth = () => {
  return (
    <PosterImage
      elevation={4}
      imageURL={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
    />
  );
};

export const AspectRatio = () => {
  return (
    <PosterImage
      elevation={4}
      imageURL={`https://image.tmdb.org/t/p/w154/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg`}
      aspectRatio={1.8}
    />
  );
};

export const Placeholder = () => {
  return <PosterImage />;
};
