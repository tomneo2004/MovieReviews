import { createStyles } from "@material-ui/core";

import {IStyleProps} from './progressiveImage';

export default createStyles({
    background:(props:IStyleProps)=>({
        backgroundImage: `url(${props.src})`,
        backgroundOrigin: 'border-box',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        transition: `${props.transitionTimeout}ms all linear`,
        filter: `${props.isLoading?'grayscale(1) opacity(0.3)':''}`,
    })
})