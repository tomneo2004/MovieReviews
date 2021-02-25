import { createStyles, Theme } from "@material-ui/core";

interface IStyleProps {
  theme:Theme;
  thumbSMDown:number;
  thumbSMUp:number;
  thumbMDUp:number;
  thumbLGUp:number;
  thumbXLUp:number;
  compact:boolean;
  thumbWidth: number;
  thumbHeight: number;
}

export default createStyles({
  paper: {
    height: "75%",
    overflow: 'visible'
  },
  media: (props: IStyleProps) => ({
    width: props.thumbWidth,
    height: props.thumbHeight,
  }),
  fab:(props:IStyleProps)=>({
    position:'absolute',
    right:props.compact?0:'-5px',
    top:props.compact?0:'-5px'
  }),
  card:(props:IStyleProps)=>({
    [props.theme.breakpoints.down('xs')]:{
      width:props.thumbSMDown,
    },
    [props.theme.breakpoints.up('sm')]:{
      width:props.thumbSMUp,
    },
    [props.theme.breakpoints.up('md')]:{
      width:props.thumbMDUp,
    },
    [props.theme.breakpoints.up('lg')]:{
      width:props.thumbLGUp,
    },
    [props.theme.breakpoints.up('xl')]:{
      width:props.thumbXLUp,
    },
  })
});
