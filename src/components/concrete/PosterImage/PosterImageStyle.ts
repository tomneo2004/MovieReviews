import { createStyles, Theme } from "@material-ui/core/styles";

interface IPosterImageStyle {
  smDown:number;
  smUp:number;
  mdUp:number;
  lgUp:number;
  xlUp:number;
  aspectRatio:number;
  theme:Theme;
  cursor: string;
}

export default createStyles({
  card:(props:IPosterImageStyle)=>({
    [props.theme.breakpoints.down('xs')]:{
      width:props.smDown,
      height:props.smDown*props.aspectRatio,
    },
    [props.theme.breakpoints.up('sm')]:{
      width:props.smUp,
      height:props.smUp*props.aspectRatio,
    },
    [props.theme.breakpoints.up('md')]:{
      width:props.mdUp,
      height:props.mdUp*props.aspectRatio,
    },
    [props.theme.breakpoints.up('lg')]:{
      width:props.lgUp,
      height:props.lgUp*props.aspectRatio,
    },
    [props.theme.breakpoints.up('xl')]:{
      width:props.xlUp,
      height:props.xlUp*props.aspectRatio,
    },
  }),
  cardMedia: (props: IPosterImageStyle) => ({
    objectFit: "fill",
    cursor: props.cursor,
  }),
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
