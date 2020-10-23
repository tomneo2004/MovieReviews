import { createStyles } from "@material-ui/core";
import {IStyleProps} from './rating.circular.comp';

export default createStyles({
    circleCap:(props:IStyleProps)=>({
        strokeLinecap:'round',
        color: props.finalColor,
    }),
    circleMask:(props:IStyleProps)=>({
        opacity: props.maskOpacity,
        color: props.finalColor,
    }),
    text:(props:IStyleProps)=>({
        color:props.finalColor,
    })
});