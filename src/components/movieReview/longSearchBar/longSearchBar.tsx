import React from 'react';
import SearchBar from '../../unit/searchBar/searchBar';
import RoundButton from '../../unit/roundButton/roundButton';

export interface IProps {
    /** initial value of keyword */
    value?: string;
    onSearchClick?: (keyword:string)=>void;
    enterKey?: boolean;
}
const LongSearchBar = (props:IProps) => {
    const {
        value = '',
        onSearchClick = null,
        enterKey = true,
    } = props

    const [keyword, setKeyword] = React.useState<string>(value);

    const handleOnSearchKeydown = (
        e:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
        )=>{
            if(enterKey && e.key==='Enter' && onSearchClick) onSearchClick(keyword);
    }

    const handleOnSearch = ()=>{
        if(onSearchClick) onSearchClick(keyword); 
    }

    const handleOnSearchChange = (
        e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        )=>{
            setKeyword(e.target.value);
    }

    return (
        <SearchBar
        onKeyDown={handleOnSearchKeydown}
        placeholder='Movie Title' 
        cornerRadius='50px'
        endAdornment={
        <RoundButton variant='outlined' cornerRadius='50px' 
        size='large' onClick={handleOnSearch}>Search</RoundButton>
        } 
        onChange={handleOnSearchChange}
        />
    );
};

export default LongSearchBar;