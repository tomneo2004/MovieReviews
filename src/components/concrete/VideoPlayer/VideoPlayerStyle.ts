import { createStyles, Theme } from "@material-ui/core";
import { ScreenWidthProps } from "../../../props/ScreenProps";

type IStyleProps = ScreenWidthProps & {
  theme: Theme;
  compact: boolean;
  thumbWidth: number;
  thumbHeight: number;
}

export default createStyles({
  paper: {
    height: "75%",
    overflow: "visible",
  },
  media: (props: IStyleProps) => ({
    width: props.thumbWidth,
    height: props.thumbHeight,
  }),
  fab: (props: IStyleProps) => ({
    position: "absolute",
    right: props.compact ? 0 : "-5px",
    top: props.compact ? 0 : "-5px",
  }),
  card: (props: IStyleProps) => ({
    [props.theme.breakpoints.down("xs")]: {
      width: props.widthAtSMDown,
    },
    [props.theme.breakpoints.up("sm")]: {
      width: props.widthAtSMUp,
    },
    [props.theme.breakpoints.up("md")]: {
      width: props.widthAtMDUp,
    },
    [props.theme.breakpoints.up("lg")]: {
      width: props.widthAtLGUp,
    },
    [props.theme.breakpoints.up("xl")]: {
      width: props.widthAtXLUp,
    },
  }),
});
