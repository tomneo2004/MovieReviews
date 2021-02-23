
import React from "react";
import MotionGallery from "./MotionGallery";

export default {
  title: "Motion Gallery",
};

const images = [
    "https://images.unsplash.com/photo-1523215108660-3fdf7932d7a5?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1613929906219-a2173ecec511?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1613950484946-76317fcf8f77?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1613963991007-de23ae6be55f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
]

export const Default = ()=>{
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <React.Fragment>
        <button onClick={()=>setOpen(state=>!state)}>Toggle</button>
        <MotionGallery open={open} onClose={()=>setOpen(state=>!state)} images={images} />
        </React.Fragment>
    )
}