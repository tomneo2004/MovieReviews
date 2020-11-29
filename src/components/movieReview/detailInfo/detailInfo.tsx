import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';
import { IGenreData } from '../../../utils/apiModelTypes';
import convertFilmLength from '../../../utils/filmLengthConverter';
import {getCircularRating} from '../../unit/circularRating/circularRating';

export interface IProps {
    title: string;
    releaseDate: string;
    length: number;
    genre: IGenreData[];
    genreTitle?: string;
    userScore: number;
    tagline?: string;
    overview?: string;
    overviewTitle?: string;
}

const renderGenre = (genre:IGenreData[])=>{
    return genre.map((g,i)=>{
        return (
            <Typography key={g.id} component='div' variant='h6'>
                <Box pl={i?2:0} fontWeight={400}>{g.name}</Box>
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
        genreTitle = 'Genres',
        userScore,
        tagline = '',
        overview = '',
        overviewTitle = 'Overview'
    } = props;

    return (
        <Box display='flex' flexDirection='column' p={2}>
            {/* title */}
            <Typography component='div' variant='h3'>
                <Box fontWeight={600}>{title}</Box>
            </Typography>
            <Box pb={2} display='flex' flexWrap='wrap' alignItems='center'>
                {/* release date */}
                <Typography component='div' variant='h5'>
                    <Box fontWeight={400}>{releaseDate}</Box>
                </Typography>
                {/* film length */}
                <Typography component='div' variant='h5'>
                    <Box pl={2} fontWeight={400}>{convertFilmLength(length)}</Box>
                </Typography>
                {
                    /* user score */
                    !userScore?null
                    :
                    <Box pl={2}>
                    {getCircularRating(userScore)}
                    </Box>
                }
            </Box>
            {/* Genre */}
            <Box display='flex' flexDirection='column' pb={2}>
                <Typography component='div' variant='h4'>
                        <Box pb={1} fontWeight={600}>{genreTitle}</Box>
                </Typography>
                <Box display='flex' flexWrap='wrap'>
                {renderGenre(genre)}
                </Box>
            </Box>
            {/* tageline */}
            {
                !tagline?null
                :
                <Typography component='div' variant='h5'>
                    <Box pb={2} fontStyle='italic'>{tagline}</Box>
                </Typography>
            }
            {/* overview */}
            {
                !overview?null
                :
                <Box display='flex' flexDirection='column'>
                    <Typography component='div' variant='h4'>
                        <Box pb={1} fontWeight={600}>{overviewTitle}</Box>
                    </Typography>
                    <Typography component='div' variant='h6'>
                        <Box>{overview}</Box>
                    </Typography>
                </Box>
            }
        </Box>
    );
};

export default DetailInfo;