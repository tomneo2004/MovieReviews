import { makeStyles } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';
import style from './round.button.style';

export interface IProps extends ButtonProps {
    children?: string|React.ReactElement;
    cornerRadius?: string;
}

const ExtendButton = (props:IProps) => {
    const {
        children,
        cornerRadius = '4px',
        ...rest
    } = props;

    const classes = makeStyles(style)({cornerRadius});

    return (
        <Button className={classes.root} {...rest}>{children}</Button>
    );
};

export default ExtendButton;