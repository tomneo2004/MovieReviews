import Button from '@material-ui/core/Button';
import { action } from '@storybook/addon-actions';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import SearchBar from './SearchBar';

export default {
  title: 'Search Bar',
};

export const Default = () => {
    return (
        <Navigation 
        rightButtons={[
            <SearchBar 
            placeholder='Enter keywords'
            opacity={0.5}
            opacityHover={0.7}
            inputWidth='7.5em'
            inputFocusWidth='10em'
            />
        ]}
        />
    )
}

export const WithButton = () => {
    const [text, setText] = React.useState<string>('');

    return (
        <Navigation 
        rightButtons={[
            <SearchBar 
            placeholder='Search...'
            value={text}
            opacity={0.5}
            opacityHover={0.7}
            inputWidth='15em'
            inputFocusWidth='20em'
            endAdornment={
                <Button variant='contained' onClick={()=>action('Search')(text)}>Search</Button>
            }
            onValueChange={(value)=>setText(value)}
            onEnter={(value)=>{
                action('Enter')(value)
                setText(value)
            }}
            />
        ]}
        />
    )
}