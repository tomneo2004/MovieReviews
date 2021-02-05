import React from 'react';
import {useRouter} from 'next/router';
import PageLayout from '../../layouts/pageLayout';
import Navigation from '../../components/movieReview/navigation/navigation';
import Pagination from '@material-ui/lab/Pagination/Pagination';
import SearchLayout from '../../layouts/search/searchLayout';
import SearchBar from '../../components/movieReview/searchBar/searchBar';
import { getRoute, RouteType } from '../../routes/routesGenerator';
import SearchResults from '../../components/movieReview/searchResults/searchResults';
import { motion } from 'framer-motion';
import { LayoutIdTypes } from '../../framer/LayoutIdTypes';
import { GetServerSideProps } from 'next';
import { ISearchMovieData } from '../../utils/api/model/apiModelTypes';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

async function fetchData(url:string){
    try{
        const resp = await axios.get(url);
        const data: ISearchMovieData = resp.data;
        return data;
    }
    catch(e){
        return Promise.reject(e);
    }
}

const apiRoute = `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/api/search/movies`;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {query, page=1} = context.query as {[key:string]:string};
    try{
        const data = await fetchData(`${apiRoute}?query=${query}&page=${page}`);
        return {
            props:{
                query:query,
                data:data,
                error:null,
            }
        }
    }
    catch(e){
        return {
            props:{
                query:query,
                data:null,
                error:e.message,
            }
        }
    }
    
}

interface IPageProps {
    query:string;
    data:ISearchMovieData;
    error:any
}

const SearchPage = (pageProps:IPageProps) => {
    const {data, error, query} = pageProps;
    const router = useRouter();

    const handlePageChange = (_event:React.ChangeEvent<unknown>, page:number)=>{
        router.push(getRoute(RouteType.search, {query:query, page:page.toString()}))
    }

    const handleSearch = (value:string)=>{
        router.push(getRoute(RouteType.search, {query:value}))
    }

    return (
        <PageLayout
        navigation={
        <motion.div layoutId={LayoutIdTypes.navigation}>
        <Navigation 
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
        />
        </motion.div>
        }>
            <SearchLayout>
            {error?
                <Typography variant='h4' component='div'>
                    <Box display='flex' justifyContent='center'>{'Ooops, somthing is not right'}</Box>
                </Typography>
                :
                <React.Fragment>
                    <SearchResults data={data.results} keywords={query} />
                    <Pagination count={data.total_pages} page={data.page} onChange={handlePageChange}
                    showFirstButton showLastButton />
                </React.Fragment>
            }    
            </SearchLayout>    
        </PageLayout>
    );
};

export default SearchPage;