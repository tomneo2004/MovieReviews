import { Grid, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';

export interface IProps{
    poster: React.ReactElement;
    info: React.ReactElement;
    children?: React.ReactElement;
}

const MovieLayout = (props:IProps) => {
    const {
        poster,
        info,
        children = null
    } = props;
    const theme = useTheme();
    return (
        <Box display='flex' flexDirection='column' justifyContent='flex-start' 
        p={2} bgcolor={theme.palette.primary.light}
        >
            {/* information */}
            <Grid container>
                <Grid md={4} item container justify='center'>{poster}</Grid>
                <Grid md={8} item container justify='center'>{info}</Grid>
            </Grid>
            {children}
        </Box>
    );
};

export default MovieLayout;