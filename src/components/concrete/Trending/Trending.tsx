import { fade, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { useTrendingMovies } from '../../../effects/apiFetch/trendingMovies';
import { IMovieData } from '../../../utils/api/model/apiModelTypes';
import { buildImageQuery } from '../../../utils/api/query/apiQueryBuilder';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import FancyTab from '../FancyTab/FancyTab';
import MovieCollection from '../MovieCollection/MovieCollection';

let timerHandler:NodeJS.Timeout;

type TrendingProps = React.ComponentProps<typeof Box>;

const Trending: React.FC<TrendingProps> = (props:TrendingProps) => {
    const {
      ...rest
    } = props;

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
      <Box {...rest}>
        <BackgroundImage 
        imageSrc={trendingBg}
        backdropColor={fade(theme.palette.primary.light, 0.6)}
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
            {...rest}
            header={
              <Box display='flex' flexWrap='wrap' alignItems='center'>
                <Box pr={2}>{`Trending`}</Box>
                <FancyTab 
                  tabData={[
                    {id:'day', value:'day', label:'To day'},
                    {id:'week', value:'week', label:'This week'},
                  ]} 
                  onChange={handleWindowChange}/>
              </Box>
            }
            movieData={trendingMovies.data}
            onHover={handleTrendingMovieHover}
            />
        </BackgroundImage>
      </Box>
    );
};

export default Trending;