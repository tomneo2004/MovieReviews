import { createStyles } from "@material-ui/core";
import {IProps} from './rating.circular.comp';

export default createStyles({
    circleCap:{
        strokeLinecap:'round',
    },
    circleOpacity:(props:IProps)=>({
        opacity: props.opacity
    })
});