import { createStyles, Theme } from "@material-ui/core/styles";
import { ScreenWidthProps } from "../../../props/ScreenProps";

type IPosterImageStyle = ScreenWidthProps & {
  aspectRatio: number;
  theme: Theme;
  cursor: string;
};

export default createStyles({
  card: (props: IPosterImageStyle) => ({
    [props.theme.breakpoints.down("xs")]: {
      width: props.widthAtSMDown,
      height: props.widthAtSMDown * props.aspectRatio,
    },
    [props.theme.breakpoints.up("sm")]: {
      width: props.widthAtSMUp,
      height: props.widthAtSMUp * props.aspectRatio,
    },
    [props.theme.breakpoints.up("md")]: {
      width: props.widthAtMDUp,
      height: props.widthAtMDUp * props.aspectRatio,
    },
    [props.theme.breakpoints.up("lg")]: {
      width: props.widthAtLGUp,
      height: props.widthAtLGUp * props.aspectRatio,
    },
    [props.theme.breakpoints.up("xl")]: {
      width: props.widthAtXLUp,
      height: props.widthAtXLUp * props.aspectRatio,
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
