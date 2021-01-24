import React from 'react';
import {NextRouter, useRouter} from 'next/router';
import {useSearchMovies} from '../../effects/apiFetch/searchMovies';
import PageLayout from '../../layouts/pageLayout';
import Navigation from '../../components/movieReview/navigation/navigation';
import { Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import { IMovieData, ISearchMovieData } from '../../utils/api/model/apiModelTypes';
import MoviePoster from '../../components/movieReview/poster/poster';
import { buildImageQuery } from '../../utils/api/query/apiQueryBuilder';
import Box from '@material-ui/core/Box/Box';
import getMovieRating from '../../utils/movieRating';
import Pagination from '@material-ui/lab/Pagination/Pagination';
import SearchLayout from '../../layouts/search/searchLayout';
import NavSearch from '../../components/unit/navSearch/navSearch';
import { Skeleton } from '@material-ui/lab';

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
    const [search, setSearch] = React.useState('');
    
    React.useEffect(()=>{
        window.scrollTo(0,0);
    })

    const handlePageChange = (_event:React.ChangeEvent<unknown>, page:number)=>{
        router.push(`${router.pathname}?query=${query}&page=${page}`);
    }
    
    const handleSearchChange = (
        event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setSearch(event.target.value);
    }

    const handlSearchKeyPress = (event: React.KeyboardEvent<HTMLDivElement>)=>{
        if(event.key === 'Enter' && search){
            router.push(`/search?query=${search}`);
        }
    }

    const handlePosterClick = (id:number)=>{
        router.push(`/movie?id=${id}`);
    }

    return (
        <PageLayout
        navigation={<Navigation 
            position='sticky' 
            hideOnScroll={true}
            rightButtons={[
                <NavSearch 
                placeholder='Search...'
                onChange={handleSearchChange}
                onKeyPress={handlSearchKeyPress}
                />
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