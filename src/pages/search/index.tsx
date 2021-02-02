import React from 'react';
import {useRouter} from 'next/router';
import {useSearchMovies} from '../../effects/apiFetch/searchMovies';
import PageLayout from '../../layouts/pageLayout';
import Navigation from '../../components/movieReview/navigation/navigation';
import Pagination from '@material-ui/lab/Pagination/Pagination';
import SearchLayout from '../../layouts/search/searchLayout';
import SearchBar from '../../components/movieReview/searchBar/searchBar';
import { getRoute, RouteType } from '../../routes/routesGenerator';
import SearchResults from '../../components/movieReview/searchResults/searchResults';


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
            {data?<SearchResults data={data.results} onPosterClick={handlePosterClick} />
            :
            <SearchResults data={null} />
            }
            {!data?null
            :
            <Pagination count={data.total_pages} page={data.page} onChange={handlePageChange}
            showFirstButton showLastButton
            />
            }
            </SearchLayout>    
        </PageLayout>
    );
};

export default SearchPage;