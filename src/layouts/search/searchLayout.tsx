import { useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';

export interface IProps{
    children: React.ReactElement[];
}

const SearchLayout = (props:IProps) => {
    const {
        children
    } = props;
    const theme = useTheme();
    
    return (
        <Box display='flex' flexDirection='column' justifyContent='flex-start'
        py={2} bgcolor={theme.palette.primary.light}
        >
        {children}
        </Box>
    );
};

export default SearchLayout;