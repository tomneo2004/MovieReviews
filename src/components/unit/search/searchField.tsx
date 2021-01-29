import { Box, InputBase, InputBaseProps, makeStyles, useTheme } from '@material-ui/core';
import { SearchSharp } from '@material-ui/icons';
import React from 'react';
import style from './searchFieldStyle';

interface IProps extends InputBaseProps {
    bgColor?: string;
    opacity?: number;
    opacityHover?: number;
    icon?: React.ReactElement;
    onFocus?: ()=>void;
}

export type SearchFieldProps = IProps

const Search = (props:IProps) => {
    const theme = useTheme();
    const {
        bgColor = theme.palette.common.white,
        opacity = 0.15,
        opacityHover = 0.25,
        icon = <SearchSharp />,
        onFocus = null,
        endAdornment,
        ...restInput
    } = props;
    const inputRef = React.useRef<HTMLInputElement>();

    React.useEffect(()=>{
        inputRef.current.onfocus = onFocus;

        return ()=>{
            inputRef.current.onfocus = null;
        }
    }, [])

    const classes = makeStyles(style)({
        theme,
        bgColor,
        opacity,
        opacityHover,
    });

    return (
        <Box className={classes.root} display='flex'>
            <Box display='flex' justifyContent='center' alignItems='center' px={1}>
            {icon}
            </Box>
            <Box flex={1}>
                <InputBase
                inputRef={inputRef}
                // className={classes.input}
                {...restInput}
                />
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center'>
            {endAdornment}
            </Box>
        </Box>
    );
};

export default Search;