import React from 'react';
import {useRouter} from 'next/router';
import {useSearchMovies} from '../../effects/apiFetch/searchMovies';
import PageLayout from '../../layouts/pageLayout';
import Navigation from '../../components/movieReview/navigation/navigation';
import { Card, CardContent, Grid } from '@material-ui/core';
import { ISearchMovieData } from '../../utils/api/model/apiModelTypes';
import MoviePoster from '../../components/movieReview/moviePoster/moviePoster';
import { buildImageQuery } from '../../utils/api/query/apiQueryBuilder';
import Box from '@material-ui/core/Box/Box';
import getMovieRating from '../../utils/movieRating';
import Pagination from '@material-ui/lab/Pagination/Pagination';
import SearchLayout from '../../layouts/search/searchLayout';
import SearchBar from '../../components/movieReview/searchBar/searchBar';
import { Skeleton } from '@material-ui/lab';
import { getRoute, RouteType } from '../../routes/routesGenerator';
import Link from 'next/link';

const renderResults = (data:ISearchMovieData, onPosterClick:(id:number)=>void|null)=>{
    if(!data){
        const skls = [];
        for(let i=0; i<4; i++){
            skls.push(i);
        }

        return (
            <Grid container>
            {
                skls.map(sk=>{
                    return (
                        <Grid key={sk} item xs>
                            <Box display='flex' justifyContent='center' alignItems='center' p={2}>
                                <Card elevation={0}>
                                    <Skeleton variant='rect' width={200} height={270} />
                                    <CardContent>
                                        <Skeleton width='60%' />
                                        <Skeleton width='20%' />
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    )
                })
            }
            </Grid>
        )
    }

    const results = data.results;

    return (
        <Grid container>
        {
            results.map(result=>{
                return (
                    <Grid key={result.id} item xs>
                        <Box display='flex' justifyContent='center' alignItems='center' p={2}>
                            <Link href={getRoute(RouteType.movie, {id:result.id.toString()})}>
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
                                onClick={()=>{
                                    if(onPosterClick) onPosterClick(result.id);
                                }}
                                />
                            </Link>
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
    const router = useRouter();
    const {query, page} = router.query as {[key:string]:string};
    const {data} = useSearchMovies(query, Number(page));

    const handlePageChange = (_event:React.ChangeEvent<unknown>, page:number)=>{
        router.push(getRoute(RouteType.search, {query:query, page:page.toString()}))
    }

    const handleSearch = (value:string)=>{
        router.push(getRoute(RouteType.search, {query:value}))
    }

    const handlePosterClick = (id:number)=>{
        router.push(getRoute(RouteType.movie, {id:id.toString()}))
    }

    return (
        <PageLayout
        navigation={<Navigation 
            position='sticky' 
            hideOnScroll={true}
            rightButtons={[
                <SearchBar 
                fullWidth
                placeholder='Search ...' 
                onEnter={handleSearch} 
                opacity={0.5}
                opacityHover={0.7}
                inputWidth='7.9em'
                inputFocusWidth='9.5em' />
            ]} 
        />}
        >
            <SearchLayout>
            {renderResults(data, handlePosterClick)}
            {data?renderPagination(data.total_pages, data.page, handlePageChange):null}
            </SearchLayout>    
        </PageLayout>
    );
};

export default SearchPage;