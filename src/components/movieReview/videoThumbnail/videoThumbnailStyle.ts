import { createStyles } from "@material-ui/core";

interface IStyleProps {
    thumbWidth: number;
    thumbHeight: number;
}

export default createStyles({
    media:(props:IStyleProps)=>({
        width:props.thumbWidth,
        height:props.thumbHeight
    })
})