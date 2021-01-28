import Box from '@material-ui/core/Box';
import React from 'react';
import { useTrendingMovies } from '../../../effects/apiFetch/trendingMovies';
import { IMovieData } from '../../../utils/api/model/apiModelTypes';
import { buildImageQuery } from '../../../utils/api/query/apiQueryBuilder';
import BackgroundImage from '../backgroundImage/backgroundImage';
import FancyTab from '../fancyTab/fancyTab';
import MovieCollection from '../movieCollection/movieCollection';

const Trending = () => {
    const [trendingBg, setTrendingBg] = React.useState<string>('');
    const [trendingWindow, setTrendingWindow] = React.useState<'day' | 'week'>('day')
    const trendingMovies = useTrendingMovies(trendingWindow);

    const handleTrendingMovieHover = (data:IMovieData)=>{
        setTrendingBg(buildImageQuery(data.backdrop_path, 'original'));
    }

    const handleWindowChange = (value:any)=>{
        setTrendingWindow(value);
    }

    return (
        <BackgroundImage imageSrc={trendingBg}
          keyframesAnimIn={{
            '0%':{transform:'translate(100%)'},
            '100%':{transform:'translate(0%)'}
          }}
          keyframesAnimOut={{
            '0%':{transform:'translate(0%)'},
            '100%':{transform:'translate(-100%)'}
          }}>
            <MovieCollection 
            title={
              <Box display='flex'>
                {`Trending`}
                <Box pl={2}>
                  <FancyTab 
                  tabData={[
                    {id:'day', value:'day', label:'Day'},
                    {id:'week', value:'week', label:'Week'},
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