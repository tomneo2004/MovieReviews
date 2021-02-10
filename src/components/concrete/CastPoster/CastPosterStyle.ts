import { createStyles } from '@material-ui/core';
import {IProps} from './CastPoster';

export default createStyles({
    root:(props:IProps)=>({
        width:props.width,
        minHeight:props.minHeight,
    }),
})