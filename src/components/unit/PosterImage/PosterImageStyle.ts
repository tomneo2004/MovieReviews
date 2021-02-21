import { createStyles } from "@material-ui/core/styles";

interface IPosterImageStyle { 
  enlarge:boolean;
  cursor:string;
}

export default createStyles({
  cardMedia:(props:IPosterImageStyle)=>({
    objectFit: "fill",
    cursor: props.cursor,
  }),
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
