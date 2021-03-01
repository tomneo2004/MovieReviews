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
        <VerticalList itemCount={items.length} width='100%' height='300px'>
        {({index})=>{
            return (<span>{items[index]}</span>);
        }}
        </VerticalList>
    )
}