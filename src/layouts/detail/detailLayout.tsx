import Box from '@material-ui/core/Box';
import React from 'react';

export interface IProps{
    poster: React.ReactElement;
}

const DetailLayout = (props:IProps) => {
    const {
        poster,
    } = props;
    return (
        <Box display='flex' flexDirection='column' justifyContent='flex-start'>
            {/* information */}
            <Box display='flex' flexWrap='wrap' justifyContent='flex-start' 
            alignItems='center' p={2}
            >
            {poster}
            </Box>
        </Box>
    );
};

export default DetailLayout;