import { makeStyles, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';
import SearchField, { SearchFieldProps } from '../../unit/SearchField/SearchField';
import style from './searchBarStyle';

export interface IProps extends SearchFieldProps {
    /**
     * when enter key pressed
     */
    onEnter?:(value:string)=>void;
    onValueChange?:(value:string)=>void;
    inputWidth?:string;
    inputFocusWidth?:string;
}

const SearchBar = (props:IProps) => {
    const {
        onEnter = null,
        onValueChange = null,
        inputWidth = '50%',
        inputFocusWidth = '100%',
        ...rest
    } = props;

    const theme = useTheme();
    const [search, setSearch] = React.useState<string>('');
    const [width, setWidth] = React.useState<string>(inputWidth);

    const classes = makeStyles(style)({
        theme,
        width
    })

    const handleSearchChange = (
        event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setSearch(event.target.value);
        if(onValueChange) onValueChange(event.target.value);
    }

    const handlSearchKeyPress = (event: React.KeyboardEvent<HTMLDivElement>)=>{
        if(event.key === 'Enter' && search && onEnter){
            onEnter(search);
        }
    }

    const handleOnFocus = ()=>{
        setWidth(inputFocusWidth);
    }

    const handleOnBlur = ()=>{
        setWidth(inputWidth);
    }

    return (
        <Box className={classes.root}>
            <SearchField 
            {...rest}
            value={search}
            opacity={0.5}
            opacityHover={0.7}
            onKeyPress={handlSearchKeyPress}
            onChange={handleSearchChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            />
        </Box>
    );
};

export default SearchBar;