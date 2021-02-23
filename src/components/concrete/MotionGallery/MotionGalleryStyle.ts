import { createStyles, fade, Theme } from "@material-ui/core";

interface IMotionGalleryStyle { 
    theme: Theme;
}

export default createStyles({
    button:(props:IMotionGalleryStyle)=>({
        backgroundColor: fade(props.theme.palette.primary.light, 0.7)
    }),
})