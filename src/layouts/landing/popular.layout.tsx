import Box from '@material-ui/core/Box';
import React from 'react';

export interface IProps {
    title:React.ReactElement;
}

const PopularLayout = (props:IProps) => {
    const {
        title
    } = props;
    return (
        <Box px={1} py={3}>
            {title}
        </Box>
    );
};

export default PopularLayout;