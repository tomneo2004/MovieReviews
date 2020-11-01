
import { Box } from '@material-ui/core';
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

    return (
        <Box flexDirection='column' justifyContent='flex-start' alignItems='center'>
            {navigation?navigation:null}
            {children}
            {footer?footer:null}        
        </Box>
    );
};

export default PageLayout;