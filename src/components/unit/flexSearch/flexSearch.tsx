import { Box, InputBase, InputBaseProps, makeStyles, useTheme } from '@material-ui/core';
import { SearchSharp } from '@material-ui/icons';
import React from 'react';
import style from './flexSearchStyle';

export interface IProps extends InputBaseProps {
    bgColor?: string;
    opacity?: number;
    opacityHover?: number;
    icon?: React.ReactElement;
    inputWidth?:string;
    inputWidthFocus?:string;
}

const FlexSearch = (props:IProps) => {
    const theme = useTheme();
    const {
        bgColor = theme.palette.common.white,
        opacity = 0.15,
        opacityHover = 0.25,
        icon = <SearchSharp />,
        inputWidth = '5em',
        inputWidthFocus='7em',
        ...restInput
    } = props;

    const classes = makeStyles(style)({
        theme,
        bgColor,
        opacity,
        opacityHover,
        inputWidth,
        inputWidthFocus,
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

export default FlexSearch;