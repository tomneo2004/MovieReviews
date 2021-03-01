import React from "react";
import CastPoster from "./CastCard";

export default {
  title: "Cast Poster",
};

export const Default = () => {
  return (
    <CastPoster
      src={`https://image.tmdb.org/t/p/w138_and_h175_face/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg`}
      name="Chris Allen"
      characterName="Bob talent"
      cardWidth={138}
    />
  );
};

export const Wrap = () => {
  return (
    <CastPoster
      src={`https://image.tmdb.org/t/p/w138_and_h175_face/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg`}
      name="Chris Allen Chris Allen Chris Allen"
      characterName="Bob talent"
      cardWidth={238}
    />
  );
};
