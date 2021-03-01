import { createStyles, Theme } from "@material-ui/core/styles";
import { ScreenWidthProps } from "../../../props/screenSizeProps";

type IPosterImageStyle = ScreenWidthProps & {
  fixedWidth: number;
  aspectRatio: number;
  theme: Theme;
  hoverCursor: string;
};

const getSize = (fixedWidth: number, width: number, ratio: number) => {
  const finalWidth = fixedWidth ? fixedWidth : width;
  return {
    width: finalWidth,
    height: finalWidth * ratio,
  };
};

export default createStyles({
  card: (props: IPosterImageStyle) => ({
    [props.theme.breakpoints.down("xs")]: {
      ...getSize(props.fixedWidth, props.widthAtSMDown, props.aspectRatio),
    },
    [props.theme.breakpoints.up("sm")]: {
      ...getSize(props.fixedWidth, props.widthAtSMUp, props.aspectRatio),
    },
    [props.theme.breakpoints.up("md")]: {
      ...getSize(props.fixedWidth, props.widthAtMDUp, props.aspectRatio),
    },
    [props.theme.breakpoints.up("lg")]: {
      ...getSize(props.fixedWidth, props.widthAtLGUp, props.aspectRatio),
    },
    [props.theme.breakpoints.up("xl")]: {
      ...getSize(props.fixedWidth, props.widthAtXLUp, props.aspectRatio),
    },
    cursor: props.hoverCursor,
  }),
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
