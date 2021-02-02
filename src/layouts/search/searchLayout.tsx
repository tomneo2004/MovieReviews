
import Box from '@material-ui/core/Box';
import React from 'react';

export interface IProps{
    children: React.ReactElement[];
}

const SearchLayout = (props:IProps) => {
    const {
        children
    } = props;
    
    return (
        <Box display='flex' flexDirection='column' justifyContent='flex-start'
        py={2}
        >
        {children}
        </Box>
    );
};

export default SearchLayout;