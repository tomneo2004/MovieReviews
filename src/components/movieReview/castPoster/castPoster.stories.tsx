import React from 'react';
import CastPoster from './castPoster';

export default {
  title: 'Cast Poster',
};

export const Default = () => {
    return (
        <CastPoster
        imageSrc={`https://image.tmdb.org/t/p/w138_and_h175_face/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg`}
        name='Chris Allen'
        characterName='Bob talent'
        imageWidth={138}
        imageHeight={175}
        />
    )
}