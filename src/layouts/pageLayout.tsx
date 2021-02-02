
import { Box, useTheme } from '@material-ui/core';
import React from 'react';

export interface IProps{
    children:React.ReactNode;
    navigation?:React.ReactNode;
    footer?:React.ReactNode;
}
const PageLayout = (props:IProps) => {
    const {
        children,
        navigation = null,
        footer = null,
    } = props;

    const theme = useTheme();

    return (
        <Box position='relative' flexDirection='column' justifyContent='flex-start' 
        alignItems='center' bgcolor={theme.palette.primary.light} height='inherit'>
            {navigation?navigation:null}
            {children}
            {footer?footer:null}        
        </Box>
    );
};

export default PageLayout;