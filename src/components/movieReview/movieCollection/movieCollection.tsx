import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import MoviePoster from '../poster/poster';
import HScroll, { HScrollChildProp } from '../../unit/horizontalScroll/hScroll';
import React from 'react';
import { IMovieData } from '../../../utils/api/model/apiModelTypes';
import { buildImageQuery } from '../../../utils/api/query/apiQueryBuilder';
import getMovieRating from '../../../utils/movieRating';

export interface IProps {
    title?: React.ReactNode | null | undefined;
    movieData: IMovieData[] | null | undefined;
    onHover?:(data:IMovieData)=>void | null | undefined;
}

const renderSkeletons = ()=>{
    const skeletons:HScrollChildProp[] = [];
    
      for(let i=0; i<12; i++){
          skeletons.push({
            id:i,
            element: (<Paper key={i}>
              <Box width='150px' p={1}>
                  <Skeleton animation="wave" variant='rect' height='150px'/>
                  <Skeleton animation="wave" variant='text'/>
                  <Skeleton animation="wave" variant='text'/>
              </Box>
          </Paper>)
          });
      }

      return (
          <HScroll>
          {()=>skeletons}    
          </HScroll>
      )
}

const renderCollection = (movieData:IMovieData[], onHover:(data:IMovieData)=>void = null)=>{
    
    const handleMouseOver = (data:IMovieData)=>{
        if(onHover) onHover(data);
    }


    return (
        <HScroll>
        {()=>{
            return movieData.map(data=>{
                return({
                  id: data.id,
                  element: (<MoviePoster 
                    imageURL={buildImageQuery(data.poster_path, 'w185')}
                    imageWidth={185}
                    minWidth={200}
                    title={data.title}
                    releaseDate={data.release_date}
                    ratingScore={getMovieRating(data.vote_count, data.vote_average)}
                    ratingOffsetX={-8}
                    ratingOffsetY={-8}
                    onMouseOver={()=>handleMouseOver(data)}
                    />)
                })
            })
        }}    
        </HScroll>
    )
}

/**
 * Component wrap around horizontal scrol collection
 */
const MovieCollection = (props:IProps) => {
    const {
        title = null,
        movieData = null,
        onHover = null,
    } = props;

    return (
        <Box>
            {title?
                <Typography component='div' variant='h4'>
                    <Box pl={2} fontWeight={600}>{title}</Box>
                </Typography>
                :null
            }
            <Box pt={2}>
            {movieData?
                renderCollection(movieData, onHover)
                :renderSkeletons()
            }
            </Box>
        </Box>
    );
};

//make this component as pure component
export default React.memo(MovieCollection, 
    (pre, next)=>{

        if(!pre.movieData || !next.movieData) return false;
        return true;
});