import React from 'react';
import CircularRating from './rating.circular.comp';

export default {
  title: 'Circular Rating',
};

export const Default = () => {
    return (
        <CircularRating />
    )
}

export const Postive = () => {
  return (
      <CircularRating value={70} />
  )
}

export const Average = () => {
  return (
      <CircularRating value={60} />
  )
}

export const Negative = () => {
  return (
      <CircularRating value={5} />
  )
}

export const MaskOpacity = () => {
  return (
      <CircularRating value={5} maskOpacity={0.5} />
  )
}