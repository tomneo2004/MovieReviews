import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';
import convertFilmLength from '../../../utils/filmLengthConverter';

export interface IProps {
    title: string;
    releaseDate: string;
    length: number;
    genre: string[];
}

const renderGenre = (genre:string[])=>{
    return genre.map((g,i)=>{
        return (
            <Typography key={i} component='div' variant='h6'>
                <Box pl={i?2:0} fontWeight={400}>{g}</Box>
            </Typography>
        )
    })
}
const DetailInfo = (props:IProps) => {
    const {
        title,
        releaseDate,
        length,
        genre,
    } = props;

    return (
        <Box display='flex' flexDirection='column'>
            {/* title */}
            <Typography component='div' variant='h3'>
                <Box fontWeight={600}>{title}</Box>
            </Typography>
            <Box pb={2} display='flex' flexWrap='wrap'>
                {/* release date */}
                <Typography component='div' variant='h5'>
                    <Box fontWeight={400}>{releaseDate}</Box>
                </Typography>
                {/* film length */}
                <Typography component='div' variant='h5'>
                    <Box pl={2} fontWeight={400}>{convertFilmLength(length)}</Box>
                </Typography>
            </Box>
            <Box pb={2} display='flex' flexWrap='wrap'>
            {renderGenre(genre)}
            </Box>
        </Box>
    );
};

export default DetailInfo;