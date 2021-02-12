import { fade, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
// import { useTrendingMovies } from '../../../effects/apiFetch/trendingMovies';
import { IMovieData } from '../../../utils/api/model/apiModelTypes';
import { buildImageQuery } from '../../../utils/api/query/apiQueryBuilder';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import FancyTab from '../FancyTab/FancyTab';
import MovieCollection from '../MovieCollection/MovieCollection';

let timerHandler:NodeJS.Timeout;

const tabData = [
  {id:'day', value:'day', label:'To day'},
  {id:'week', value:'week', label:'This week'},
];

type TrendingProps = React.ComponentProps<typeof Box> & {
  byDay: IMovieData[];
  byWeek: IMovieData[];
};

const Trending: React.FC<TrendingProps> = (props:TrendingProps) => {
    const {
      byDay,
      byWeek,
      ...rest
    } = props;

    const theme = useTheme();
    const [trendingBg, setTrendingBg] = React.useState<string>('');
    // const trendingMovies = useTrendingMovies(trendingWindow);
    const [movieData, setMovieData] = React.useState<IMovieData[]>(byDay);

    const handleTrendingMovieHover = (data:IMovieData)=>{
        setTrendingBg(buildImageQuery(data.backdrop_path, 'original'));
    }

    const handleWindowChange = (value:any)=>{
        timerHandler = setTimeout(()=>{
            if(String(value) === 'day'){
              setMovieData(byDay);
            }
            else if(String(value) === 'week'){
              setMovieData(byWeek);
            }
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
                  tabData={tabData} 
                  onChange={handleWindowChange}/>
              </Box>
            }
            movieData={movieData}
            onHover={handleTrendingMovieHover}
            />
        </BackgroundImage>
      </Box>
    );
};

export default Trending;