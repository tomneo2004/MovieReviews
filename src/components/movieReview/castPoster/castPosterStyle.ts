import { createStyles } from '@material-ui/core';
import {IProps} from './castPoster';

export default createStyles({
    root:(props:IProps)=>({
        width:props.width,
        minHeight:props.minHeight,
    }),
})