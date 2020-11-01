import React from 'react';
import LandingSearch from './landingSearch';
import {action} from '@storybook/addon-actions';
import { Button } from '@material-ui/core';

export default {
  title: 'Landing Search',
};

export const Default = () => {
    return (
        <LandingSearch />
    )
}

export const PlaceHolder = () => {
    return (
        <LandingSearch placeholder='Movie Title'/>
    )
}

export const ValueChange = () => {
    return (
        <LandingSearch 
        placeholder='Movie Title' 
        onChange={(e)=>action('value change')(e.target.value)}
        />
    )
}

export const RoundCorner = () => {
    return (
        <LandingSearch 
        placeholder='Movie Title' 
        cornerRadius='50px'
        />
    )
}

export const Shadow = () => {
    return (
        <LandingSearch 
        placeholder='Movie Title' 
        cornerRadius='50px'
        boxShadow='0 0 3px 1px'
        />
    )
}

export const NoBorder = () => {
    return (
        <LandingSearch 
        placeholder='Movie Title' 
        borderWidth={0}
        />
    )
}

export const WithSearchButton = () => {
    const button = (
        <Button>Search</Button>
    )
    return (
        <LandingSearch 
        placeholder='Movie Title' 
        cornerRadius='50px'
        endAdornment={button}
        />
    )
}