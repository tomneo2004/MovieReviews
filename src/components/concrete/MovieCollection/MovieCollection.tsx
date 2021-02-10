import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import MoviePoster from '../MoviePoster/MoviePoster';
import HScroll, { HScrollChildProp } from '../../unit/HorizontalScroll/HorizontalScroll';
import React from 'react';
import { IMovieData } from '../../../utils/api/model/apiModelTypes';
import { buildImageQuery } from '../../../utils/api/query/apiQueryBuilder';
import getMovieRating from '../../../utils/movieRating';
import Link from 'next/link';
import { getRoute, RouteType } from '../../../routes/routesGenerator';
import ScaleFadeFlow from '../../../framer/ScaleFadeMotion';


type MovieCollectionProps = React.ComponentProps<typeof Box> & {
    header?: React.ReactNode;
    movieData: IMovieData[] | null | undefined;
    onHover?:(data:IMovieData)=>void | null | undefined;
}

const renderSkeletons = ()=>{
    const skeletons:HScrollChildProp[] = [];
    
      for(let i=0; i<4; i++){
          skeletons.push({
            id:i,
            element: (
                <Paper key={i}>
                    <Box width='150px' p={1}>
                        <Skeleton animation="wave" variant='rect' height='150px'/>
                        <Skeleton animation="wave" variant='text'/>
                        <Skeleton animation="wave" variant='text'/>
                    </Box>
                </Paper>
            )
          });
      }

      return (
          <HScroll id='loading-placeholder'>
          {()=>skeletons}    
          </HScroll>
      )
}

/**
 * Component wrap around horizontal scrol collection
 */
const MovieCollection: React.FC<MovieCollectionProps> = (props:MovieCollectionProps) => {
    const {
        header = null,
        movieData = null,
        onHover = null,
        ...rest
    } = props;

    const handleMouseOver = (data:IMovieData)=>{
        if(onHover) onHover(data);
    }

    return (
        <Box {...rest}>
            {header?
                <Typography component='div' variant='h4'>
                    <Box pl={2} fontWeight={600}>{header}</Box>
                </Typography>
                :null
            }
            <Box pt={2}>
            {!movieData? renderSkeletons()
                :
                <HScroll>
                {()=>{
                    return movieData.map((data, i)=>{
                        return({
                        id: data.id,
                        element: (
                            <ScaleFadeFlow enterDelay={i*0.08} exitDelay={i*0.08} layout>
                                <Link href={getRoute(RouteType.movie, {id:data.id.toString()})}>
                                    <MoviePoster 
                                        imageURL={buildImageQuery(data.poster_path, 'w185')}
                                        imageWidth={185}
                                        minWidth={200}
                                        title={data.title}
                                        releaseDate={data.release_date}
                                        ratingScore={getMovieRating(data.vote_count, data.vote_average)}
                                        onMouseOver={()=>handleMouseOver(data)}
                                        />
                                </Link>
                            </ScaleFadeFlow>    
                            )
                        })
                    })
                }}    
                </HScroll>
            }
            </Box>
        </Box>
    );
};

//render component when data are different
export default React.memo(MovieCollection, 
    (pre, next)=>{

        if(!pre.movieData || !next.movieData) return false;
        return pre.movieData === next.movieData;
});