import { fade, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { useTrendingMovies } from '../../../effects/apiFetch/trendingMovies';
import { IMovieData } from '../../../utils/api/model/apiModelTypes';
import { buildImageQuery } from '../../../utils/api/query/apiQueryBuilder';
import BackgroundImage from '../backgroundImage/backgroundImage';
import FancyTab from '../fancyTab/fancyTab';
import MovieCollection from '../movieCollection/movieCollection';

let timerHandler:NodeJS.Timeout;
const Trending = () => {
    const theme = useTheme();
    const [trendingBg, setTrendingBg] = React.useState<string>('');
    const [trendingWindow, setTrendingWindow] = React.useState<'day' | 'week'>('day')
    const trendingMovies = useTrendingMovies(trendingWindow);

    const handleTrendingMovieHover = (data:IMovieData)=>{
        setTrendingBg(buildImageQuery(data.backdrop_path, 'original'));
    }

    const handleWindowChange = (value:any)=>{
        timerHandler = setTimeout(()=>{
            setTrendingWindow(value);
            clearTimeout(timerHandler);
        }, 500);
    }

    return (
        <BackgroundImage 
        imageSrc={trendingBg}
        backdropColor={fade(theme.palette.common.white, 0.6)}
        keyframesAnimIn={{
          '0%':{transform:'translate(100%)'},
          '100%':{transform:'translate(0%)'}
        }}
        keyframesAnimOut={{
          '0%':{transform:'translate(0%)'},
          '100%':{transform:'translate(-100%)'}
        }}
        animOutTimeFun='ease'
        animInTimeFun='ease'
        loadingIndicator={
          <Box><LinearProgress /></Box>
        }>
            <MovieCollection 
            title={
              <Box display='flex'>
                {`Trending`}
                <Box pl={2}>
                  <FancyTab 
                  tabData={[
                    {id:'day', value:'day', label:'To day'},
                    {id:'week', value:'week', label:'This week'},
                  ]} 
                  onChange={handleWindowChange}/>
                </Box>
              </Box>
            }
            movieData={trendingMovies.data}
            onHover={handleTrendingMovieHover}
            />
        </BackgroundImage>
    );
};

export default Trending;