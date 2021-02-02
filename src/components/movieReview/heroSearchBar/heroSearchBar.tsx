import { Box, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import React from 'react';
import { getRoute, RouteType } from '../../../routes/routesGenerator';
import SearchBar from '../searchBar/searchBar';

const HeroSearchBar = () => {
    const router = useRouter();
    const [keywords, setKeywords] = React.useState<string>('');

    const handleSearchClick = ()=>{
        if(!keywords) return;
        router.push(getRoute(RouteType.search, {query:keywords}));
    }

    const handleEnterSearch = (value:string)=>{
        if(!value) return;
        router.push(getRoute(RouteType.search, {query:value}));
    }

    const handleSearchValueChange = (value:string)=>{
        setKeywords(value);
    }
    return (
            <Box width='100%' display='flex' justifyContent='center'>
                <Paper elevation={10}>
                    <SearchBar 
                    fullWidth
                    placeholder='Search ...' 
                    opacity={0.5}
                    opacityHover={0.7}
                    inputWidth='20em'
                    inputFocusWidth='24em' 
                    endAdornment={
                        <Button variant='contained' onClick={handleSearchClick}>Search</Button>
                    }
                    onValueChange={handleSearchValueChange}
                    onEnter={handleEnterSearch}
                    />
                </Paper>
            </Box>
    );
};

export default HeroSearchBar;