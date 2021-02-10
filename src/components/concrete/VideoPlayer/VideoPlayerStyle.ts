import { createStyles } from "@material-ui/core";

interface IStyleProps {
    thumbWidth: number;
    thumbHeight: number;
}

export default createStyles({
    paper:{
        height:'75%',
    },
    media:(props:IStyleProps)=>({
        width:props.thumbWidth,
        height:props.thumbHeight
    })
})