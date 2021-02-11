import { createStyles } from '@material-ui/core';

interface IStyleProps {
    width: string | number;
    minHeight: string | number;
}
export default createStyles({
    root:(props:IStyleProps)=>({
        width:props.width,
        minHeight:props.minHeight,
    }),
})