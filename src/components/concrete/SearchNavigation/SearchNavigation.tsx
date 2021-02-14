import Box from '@material-ui/core/Box';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import SearchBar from '../SearchBar/SearchBar';

type SearchNavigationProps = React.ComponentProps<typeof Navigation> & {
    onSearch?:(value:string)=>void;
}

/**
 * Component SearchNavigation
 * 
 * Compose Navigation and SearchBar components
 * 
 * Always have SearchBar on right side
 * 
 * @param {SearchNavigationProps} props 
 */
const SearchNavigation:React.FC<SearchNavigationProps> = (props:SearchNavigationProps) => {
    const {
        position='sticky',
        rightButtons=[],
        onSearch,
        ...rest
    } = props;

    return (
        <Navigation
            {...rest}
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