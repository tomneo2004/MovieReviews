import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Box from '@material-ui/core/Box';
import { makeStyles, useScrollTrigger, useTheme } from '@material-ui/core';
import Slide from '@material-ui/core/Slide/Slide';
import style from './NavigationStyle';

type NavigationProps = React.ComponentProps<typeof AppBar> & {
    brand?: React.ReactElement;
    rightButtons?: React.ReactElement[];
    hideOnScroll?:boolean;
}

type HideScrollProps = React.ComponentProps<typeof Slide> & {
    children: React.ReactElement;
}

const renderRightButtons = (buttons:React.ReactNode[])=>{
    if(!buttons) return null;
    return buttons.map((btn, i)=>{
        return <Box key={i} px={1}>{btn}</Box>
    })
}

const HideOnScroll = (props:HideScrollProps)=>{
    const {
        children,
        ...rest
    } = props;

    const trigger = useScrollTrigger();

    return (
        <Slide {...rest} appear={false} direction="down" in={!trigger}>
        {children}
        </Slide>
    )
}

const getAppBar = (props:NavigationProps) =>{
    const {
        brand = null,
        rightButtons = null,
        ...rest
    } = props;
    const theme =useTheme();
    const classes = makeStyles(style)({theme});

    return (
        <AppBar className={classes.appBar} {...rest}>
            <Toolbar>
                <Box flex='1'>{brand?brand:null}</Box>
                <Box flex='1' display='flex' justifyContent='flex-end'>{renderRightButtons(rightButtons)}</Box>
            </Toolbar>
        </AppBar>
    )
}

const Navigation: React.FC<NavigationProps> = (props:NavigationProps) => {
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