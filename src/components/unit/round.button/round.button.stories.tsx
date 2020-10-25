import React from 'react';
import RadiusButton from './round.button.comp';

export default {
  title: 'Radius Button',
};

export const Default = () => {
    return (
        <RadiusButton>Default</RadiusButton>
    )
}

export const OutlinedCorner = () => {
    return (
        <RadiusButton variant='outlined' cornerRadius='50px'>Cornerd</RadiusButton>
    )
}

export const ContainCorner = () => {
    return (
        <RadiusButton variant='contained' cornerRadius='50px'>Cornerd</RadiusButton>
    )
}