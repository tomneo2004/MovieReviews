import { Box, InputBase, InputBaseProps, makeStyles, useTheme } from '@material-ui/core';
import { SearchSharp } from '@material-ui/icons';
import React from 'react';
import style from './navSearchStyle';

export interface IProps extends InputBaseProps {
    bgColor?: string;
    opacity?: number;
    opacityHover?: number;
    icon?: React.ReactElement;
}

const NavSearch = (props:IProps) => {
    const theme = useTheme();
    const {
        bgColor = theme.palette.common.white,
        opacity = 0.15,
        opacityHover = 0.25,
        icon = <SearchSharp />,
        ...restInput
    } = props;

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
            <InputBase
            className={classes.input}
            {...restInput}
            />
        </Box>
    );
};

export default NavSearch;