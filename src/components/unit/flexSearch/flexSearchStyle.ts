import { createStyles } from "@material-ui/core";
import {fade, Theme} from '@material-ui/core/styles'

export interface IStyleProps {
    theme: Theme;
    bgColor: string;
    opacity: number;
    opacityHover: number;
    inputWidth:string;
    inputWidthFocus:string;
}
export default createStyles({
    root:(props:IStyleProps)=>({
        borderRadius: props.theme.shape.borderRadius,
        backgroundColor: fade(props.bgColor, props.opacity),
        '&:hover':{
            backgroundColor: fade(props.bgColor, props.opacityHover)
        },
        transition: props.theme.transitions.create('background-color', {
            duration: 500,
        }),
    }),
    input:(props:IStyleProps)=>({
        width: props.inputWidth,
        '&.Mui-focused': {
            width: props.inputWidthFocus,
          },
        transition: props.theme.transitions.create('width'),
    }),
});