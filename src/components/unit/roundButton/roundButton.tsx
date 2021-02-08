import { makeStyles } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';
import style from './RoundButtonStyle';

export type IProps = ButtonProps & {
    cornerRadius?: string;
}

const ExtendButton: React.FC<IProps> = (props:IProps) => {
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