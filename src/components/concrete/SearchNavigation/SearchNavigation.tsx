import Box from '@material-ui/core/Box';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import SearchBar from '../SearchBar/SearchBar';
import BrandIcon from '../../../assets/brand/brand.inline.svg';
import SvgIcon from '@material-ui/core/SvgIcon';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core';
import style from './SearchNavigationStyle';

type SearchNavigationProps = React.ComponentProps<typeof Navigation> & {
    /**
     * The brand link to relative path under home page
     * when click
     * 
     * default `/`
     */
    brandLinkTo?:string;
    onSearch?:(value:string)=>void;
}

/**
 * Component SearchNavigation
 * 
 * Compose Navigation and SearchBar components
 * 
 * Always have SearchBar on right side
 * 
 * Always sticky
 * 
 * @param {SearchNavigationProps} props 
 */
const SearchNavigation:React.FC<SearchNavigationProps> = (props:SearchNavigationProps) => {
    const {
        brandLinkTo = '/',
        position='sticky',
        rightButtons=[],
        onSearch,
        ...rest
    } = props;

    const classes = makeStyles(style)();

    return (
        <Navigation
            {...rest}
            brand={
              <Link href={brandLinkTo}>
                <SvgIcon className={classes.pointer} fontSize='large'>
                  <BrandIcon />
                </SvgIcon>
              </Link>
            }
            position={position}
            rightButtons={[
              ...rightButtons,  
              <Box id="nav-search-bar">
                <SearchBar
                  fullWidth
                  placeholder="Search ..."
                  onEnter={onSearch}
                  opacity={0.5}
                  opacityHover={0.7}
                  inputWidth="7.9em"
                  inputFocusWidth="9.5em"
                />
              </Box>,
            ]}
          />
    );
};

export default SearchNavigation;