import { BookmarkSharp } from '@material-ui/icons';
import React from 'react';
import Navigation from '../../movieReview/navigation/navigation';
import FlexSearch from './searchField';
import {action} from '@storybook/addon-actions';
import { Box, Toolbar } from '@material-ui/core';

export default {
  title: 'Search Field',
};

export const Default = () => {
    return (
        <Navigation 
        rightButtons={[
            <FlexSearch 
            placeholder='Search...'
            opacity={0.5}
            opacityHover={0.7}
            />
        ]}
        />
    )
}

export const Icon = () => {
    return (
        <Navigation 
        rightButtons={[
            <FlexSearch 
            placeholder='Search...'
            opacity={0.5}
            opacityHover={0.7}
            icon={<BookmarkSharp/>}
            />
        ]}
        />
    )
}

export const Color = () => {
    return (
        <Navigation 
        rightButtons={[
            <FlexSearch 
            placeholder='Search...'
            bgColor='#17aeff'
            opacity={0.5}
            opacityHover={0.7}
            icon={<BookmarkSharp/>}
            />
        ]}
        />
    )
}

export const ValueChange = () => {
    const [state, setState] = React.useState('');
    return (
        <Box>
            <Navigation 
            rightButtons={[
                <FlexSearch 
                placeholder='Search...'
                bgColor='#17aeff'
                opacity={0.5}
                opacityHover={0.7}
                onChange={(event)=>{
                    action('change')(event.target.value);
                    setState(event.target.value)
                }}
                />
            ]}
            />
            <Toolbar />
            <div>{state}</div>
        </Box>
    )
}

export const KeyPress = () => {
    const [state, setState] = React.useState('');
    return (
        <Box>
            <Navigation 
            rightButtons={[
                <FlexSearch 
                placeholder='Search...'
                bgColor='#17aeff'
                opacity={0.5}
                opacityHover={0.7}
                onChange={(event)=>{
                    setState(event.target.value)
                }}
                onKeyPress={(evt)=>{
                    action('key')(evt.key)
                }}
                />
            ]}
            />
            <Toolbar />
            <div>{state}</div>
        </Box>
    )
}

export const FocusAndBlur = () => {
    return (
        <Navigation 
        rightButtons={[
            <FlexSearch 
            placeholder='Search...'
            opacity={0.5}
            opacityHover={0.7}
            onFocus={()=>action('focus')()}
            onBlur={()=>action('blur')()}
            />
        ]}
        />
    )
}