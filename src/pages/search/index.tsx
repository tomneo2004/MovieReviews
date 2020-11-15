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
import Pagination from '@material-ui/lab/Pagination/Pagination';
import SearchLayout from '../../layouts/search/searchLayout';

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

const renderPagination = (totalPages:number, currentPage:number, 
    onPageChange:(event: React.ChangeEvent<unknown>, page: number) => void)=>{

    return(
        <Box display='flex' justifyContent='center' alignItems='center'>
            <Pagination count={totalPages} page={currentPage} onChange={onPageChange}
            showFirstButton showLastButton
            />
        </Box>
    )
}
const SearchPage = () => {
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const router = useRouter();
    const {query} = router.query as {[key:string]:string};
    const {data} = useSearchMovies(query, currentPage);
    window.scrollTo(0,0);

    const handlePageChange = (_event:React.ChangeEvent<unknown>, page:number)=>{
        setCurrentPage(page);
    }

    return (
        <PageLayout
        navigation={<Navigation position='sticky' hideOnScroll={true} />}
        >
            <SearchLayout>
            {data?renderResults(data.results):null}
            {data?renderPagination(data.total_pages, data.page, handlePageChange):null}
            </SearchLayout>    
        </PageLayout>
    );
};

export default SearchPage;