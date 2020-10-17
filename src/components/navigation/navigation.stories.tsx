import React from 'react';
import { SvgIcon } from '@material-ui/core';
import Navigation from './navigation.comp';
import BrandIcon from '../../assets/test/unicorn.inline.svg';

export default {
  title: 'Navigation',
};

export const Brand = () => {
    return (
        <Navigation 
        brand={<SvgIcon fontSize='large'><BrandIcon /></SvgIcon>} 
        />
    )
}

export const NoBrand = () => {
    return (
        <Navigation />
    )
}