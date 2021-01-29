import {Box, LinearProgress } from '@material-ui/core';
import React from 'react';
import { usePopularMovies } from '../../../effects/apiFetch/popularMovies';
import { IMovieData } from '../../../utils/api/model/apiModelTypes';
import { buildImageQuery } from '../../../utils/api/query/apiQueryBuilder';
import BackgroundImage from '../backgroundImage/backgroundImage';
import MovieCollection from '../movieCollection/movieCollection';

const Popular = () => {
    const [popularBg, setPopularBg] = React.useState<string>('');
    const popularMovies = usePopularMovies();

    const handlePopularMovieHover = (data:IMovieData)=>{
        setPopularBg(buildImageQuery(data.backdrop_path, 'original'));
    }
    return (
        <BackgroundImage 
        imageSrc={popularBg}
        backdropColor='popularBackdrop.main'
        keyframesAnimIn={{
          '0%':{transform:'translateY(-100%)'},
          '100%':{transform:'translateY(0%)'}
        }}
        keyframesAnimOut={{
          '0%':{transform:'translateY(0%)'},
          '100%':{transform:'translateY(100%)'}
        }}
        animOutTimeFun='ease'
        animInTimeFun='ease'
        loadingIndicator={
          <Box><LinearProgress /></Box>
        }>
          <MovieCollection 
          title={`What's popular`} 
          movieData={popularMovies.data}
          onHover={handlePopularMovieHover}
          />
        </BackgroundImage>
    );
};

export default Popular;