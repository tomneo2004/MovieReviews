import React from 'react';
import {useRouter} from 'next/router';
import {useSearchMovies} from '../../effects/searchMovies';
import PageLayout from '../../layouts/pageLayout';
import Navigation from '../../components/movieReview/navigation/navigation';
import { Grid } from '@material-ui/core';
import { IMovieData } from '../../utils/apiModelTypes';
import MoviePoster from '../../components/movieReview/poster/poster';
import { buildImageQuery } from '../../utils/apiQueryBuilder';
import Box from '@material-ui/core/Box/Box';
import getMovieRating from '../../utils/movieRating';

const renderResults = (results:IMovieData[])=>{
    return (
        <Grid container>
        {
            results.map(result=>{
                return (
                    <Grid key={result.id} item xs>
                        <Box display='flex' justifyContent='center' alignItems='center' p={2}>
                            <MoviePoster 
                            imageURL={buildImageQuery(result.poster_path, 'w185')}
                            imageWidth={185}
                            minWidth={200}
                            maxWidth={200}
                            title={result.title}
                            releaseDate={result.release_date}
                            ratingScore={getMovieRating(result.vote_count, result.vote_average)}
                            ratingOffsetX={-8}
                            ratingOffsetY={-8}
                            />
                        </Box>
                    </Grid>
                )
            })
        }    
        </Grid>
    )
}
const SearchPage = () => {
    const router = useRouter();
    const {query} = router.query as {[key:string]:string};
    const searchResult = useSearchMovies(query);

    console.log(searchResult);

    return (
        <PageLayout
        navigation={<Navigation position='sticky' hideOnScroll={true} />}
        >
        {searchResult.data?renderResults(searchResult.data.results):null}
        </PageLayout>
    );
};

export default SearchPage;