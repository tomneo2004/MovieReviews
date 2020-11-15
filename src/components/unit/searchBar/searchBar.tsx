import React from 'react';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';


export interface IProps extends InputBaseProps{
    /** string px/em/% */
    cornerRadius?: string;
    borderWidth?: number;
    outlineColor?: string;
    boxShadow?: string;
    endAdornment?: React.ReactElement;
}

const SearchBar = (props:IProps) => {
    const {
        cornerRadius = '4px',
        borderWidth = 1,
        outlineColor = '#9ea2a5',
        boxShadow = null,
        endAdornment = null,
        fullWidth = true,
        ...rest
    } = props;

    const border = `${borderWidth}px solid ${outlineColor}`;

    return (
        <Box pl={1} border={border} borderRadius={cornerRadius} 
        display='flex' alignItems='center' boxShadow={boxShadow}
        >
            <InputBase fullWidth  {...rest} />
            {endAdornment}
        </Box>
    );
};

export default SearchBar;