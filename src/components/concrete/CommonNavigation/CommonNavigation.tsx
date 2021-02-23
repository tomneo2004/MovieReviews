import { useRouter } from 'next/router';
import React from 'react';
import { getRoute, RouteType } from '../../../routes/routesGenerator';
import SearchNavigation from '../SearchNavigation/SearchNavigation';

type CommonNavigationProps = React.ComponentProps<typeof SearchNavigation>;

/**
 * Component CommonNavigation
 * 
 * Wrapped `SearchNavigation` component
 * handle search function and route to search result page
 * 
 * @param props 
 */
const CommonNavigation:React.FC<CommonNavigationProps> = (props:CommonNavigationProps) => {
    const {
        ...rest
    } = props;
    const router = useRouter();

    const handleSearch = (value: string) => {
        router.push(getRoute(RouteType.search, { query: value }));
    };
    
    return (
        <SearchNavigation onSearch={handleSearch} {...rest} />
    );
};

export default CommonNavigation;