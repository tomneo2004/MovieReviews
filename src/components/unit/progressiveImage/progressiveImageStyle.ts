import { createStyles } from "@material-ui/core";

import {IStyleProps} from './progressiveImage';

export default createStyles({
    background:(props:IStyleProps)=>({
        backgroundImage: `url(${props.src})`,
        backgroundOrigin: 'border-box',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        transition: '0.5s filter linear',
        filter: `${props.isLoading?'blur(50px)':''}`,
    })
})