import { createStyles, Theme } from "@material-ui/core";

interface IStyleProps {
  theme: Theme;
  titleSMDown: number;
  titleSMUp: number;
  titleMDUp: number;
  titleLGUp: number;
  titleXLUp: number;
}

export default createStyles({
  title: (props: IStyleProps) => ({
    [props.theme.breakpoints.down("xs")]: {
      width: props.titleSMDown,
    },
    [props.theme.breakpoints.up("sm")]: {
      width: props.titleSMUp,
    },
    [props.theme.breakpoints.up("md")]: {
      width: props.titleMDUp,
    },
    [props.theme.breakpoints.up("lg")]: {
      width: props.titleLGUp,
    },
    [props.theme.breakpoints.up("xl")]: {
      width: props.titleXLUp,
    },
  }),
});
