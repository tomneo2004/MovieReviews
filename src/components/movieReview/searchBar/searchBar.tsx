import React from 'react';
import NavSearch from '../../unit/navSearch/navSearch';

export interface IProps {
    onSearchReady:(value:string)=>void | null;
}

const SearchBar = (props:IProps) => {
    const {
        onSearchReady = null,
    } = props;

    const [search, setSearch] = React.useState<string>('');

    const handleSearchChange = (
        event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setSearch(event.target.value);
    }

    const handlSearchKeyPress = (event: React.KeyboardEvent<HTMLDivElement>)=>{
        if(event.key === 'Enter' && search && onSearchReady){
            onSearchReady(search);
        }
    }

    return (
        <NavSearch 
        placeholder={search?search:'Search...'}
        opacity={0.5}
        opacityHover={0.7}
        onKeyPress={handlSearchKeyPress}
        onChange={handleSearchChange}
        />
    );
};

export default SearchBar;