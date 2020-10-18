import React from 'react';
import Hero from './hero.comp';

export default {
  title: 'Hero',
};

export const Title = () => {
    return (
        <Hero 
        title='Welcome'
        />
    )
}

export const Carousel = () => {
    return (
        <Hero 
        title='Welcome'
        briefs={[
            'Find Movies',
            'See Reviews',
            'Explore'
        ]}
        />
    )
}