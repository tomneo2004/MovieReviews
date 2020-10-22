import React from 'react';
import HorizontalScroll, { IHorizontalScrollState } from './hScroll.comp';
import { action } from '@storybook/addon-actions';
import Box from '@material-ui/core/Box';

export default {
  title: 'HorizontalScroll',
};

const data:string[] = [];
for(let i=0; i<40; i++){
    data.push(`Item ${i}`);
}

const getItems = ()=>{
    return data.map(item=>{
        return <Box bgcolor='#e21db1' key={item} p={1}>{item}</Box>
    })
}

export const Horizontal = () => { 

    return (
        <HorizontalScroll>
        {()=>getItems()}
        </HorizontalScroll>
    )
}

export const HorizontalNoSpacing = () => { 

    return (
        <HorizontalScroll space={0}>
        {()=>getItems()}
        </HorizontalScroll>
    )
}

export const HorizontalSpacing = () => { 

    return (
        <HorizontalScroll space={10}>
        {()=>getItems()}
        </HorizontalScroll>
    )
}

export const HorizontalFixWidth = () => { 

    return (
        <HorizontalScroll width={300}>
        {()=>getItems()}
        </HorizontalScroll>
    )
}

export const ScrollState = () => { 

    const handleState = (state:IHorizontalScrollState)=>{
        action('scroll state')(state);
    }
    return (
        <HorizontalScroll 
        onScrollStateChange={handleState}
        >
        {()=>getItems()}
        </HorizontalScroll>
    )
}