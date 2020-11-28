import Box from '@material-ui/core/Box';
import React from 'react';

export interface IProps{
    poster: React.ReactElement;
    info: React.ReactElement;
}

const DetailLayout = (props:IProps) => {
    const {
        poster,
        info
    } = props;
    return (
        <Box display='flex' flexDirection='column' justifyContent='flex-start'>
            {/* information */}
            <Box display='flex' flexWrap='wrap' justifyContent='center' alignItems='center'>
            {poster}
            {info}
            </Box>
        </Box>
    );
};

export default DetailLayout;