import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';

export interface IProps{
    poster: React.ReactElement;
    info: React.ReactElement;
}

const DetailLayout = (props:IProps) => {
    const {
        poster,
        info,
    } = props;
    return (
        <Box display='flex' flexDirection='column' justifyContent='flex-start' p={2}>
            {/* information */}
            <Grid container>
                <Grid md={4} item container justify='center'>{poster}</Grid>
                <Grid md={8} item container justify='center'>{info}</Grid>
            </Grid>
        </Box>
    );
};

export default DetailLayout;