import { createStyles, Theme } from "@material-ui/core";
import { ScreenWidthProps } from "../../../props/screenSizeProps";

type IStyleProps = ScreenWidthProps & {
  theme: Theme;
};

export default createStyles({
  title: (props: IStyleProps) => ({
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
