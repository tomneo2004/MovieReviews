import { createStyles } from "@material-ui/core";

export interface IStyleProps{
    src: string;
    isLoading: boolean;
    transition: number;
    transitionFilter: string;
}

export default createStyles({
    background:(props:IStyleProps)=>({
        backgroundImage: `url(${props.src})`,
        backgroundOrigin: 'border-box',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        transition: `${props.transition}ms all ease-in-out`,
        filter: `${props.isLoading?props.transitionFilter:''}`,
    }),
})