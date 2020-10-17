import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar, { AppBarProps } from "@material-ui/core/AppBar";
import Box from '@material-ui/core/Box';
import { useScrollTrigger } from '@material-ui/core';
import Slide from '@material-ui/core/Slide/Slide';

export interface IProps extends AppBarProps {
    brand?: React.ReactNode;
    rightButtons?: React.ReactNode[];
    hideOnScroll?:boolean;
}

interface IHideScrollProps{
    children: React.ReactElement;
}

const renderRightButtons = (buttons:React.ReactNode[])=>{
   return buttons.map((btn, i)=>{
    return <Box key={i} px={1}>{btn}</Box>
    })
}

const HideOnScroll = (props:IHideScrollProps)=>{
    const {children} = props;

    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
        {children}
        </Slide>
    )
}

const getAppBar = (props:IProps) =>{
    const {
        brand = null,
        rightButtons = null,
        ...rest
    } = props;

    return (
        <AppBar {...rest}>
            <Toolbar>
                <Box flex='1'>{brand?brand:null}</Box>
                <Box flex='1' display='flex' justifyContent='flex-end'>{rightButtons?renderRightButtons(rightButtons):null}</Box>
            </Toolbar>
        </AppBar>
    )
}

const Navigation = (props:IProps) => {
    const {
        hideOnScroll = false,
        ...rest
    } = props;

    if(hideOnScroll){
       return <HideOnScroll>{getAppBar(rest)}</HideOnScroll>;
    }

    return getAppBar(rest);
};

export default Navigation;