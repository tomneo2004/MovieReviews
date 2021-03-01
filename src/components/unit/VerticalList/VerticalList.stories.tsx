import React from "react";
import VerticalList from "./VerticalList";


export default {
  title: "Veritcal List",
};

const getItems = ()=>{
    const bulk = [];
    for(let i=0; i<1000; i++){
        bulk.push(
            ` item${i} `
        )
    }
    return bulk;
}

export const Default = ()=>{
    const items = getItems();

    return (
        <VerticalList itemCount={items.length}>
        {({index})=>{
            return (<span>{items[index]}</span>);
        }}
        </VerticalList>
    )
}

export const FixedWidth = ()=>{
    const items = getItems();

    return (
        <VerticalList itemCount={items.length} width='300px'>
        {({index})=>{
            return (<span>{items[index]}</span>);
        }}
        </VerticalList>
    )
}

export const Indicator = ()=>{
    const items = getItems();

    return (
        <VerticalList itemCount={items.length}>
        {({index, isVisible, isScrolling})=>{
            if(isVisible && isScrolling)
                return (<span>scrolling..............</span>)
                
            return (<span>{items[index]}</span>);
        }}
        </VerticalList>
    )
}