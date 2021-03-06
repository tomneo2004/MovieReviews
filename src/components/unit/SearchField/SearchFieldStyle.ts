import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { fade } from "@material-ui/core/styles/colorManipulator";

export interface IStyleProps {
  theme: Theme;
  bgColor: string;
  opacity: number;
  opacityHover: number;
}
export default createStyles({
  root: (props: IStyleProps) => ({
    borderRadius: props.theme.shape.borderRadius,
    backgroundColor: fade(props.bgColor, props.opacity),
    "&:hover": {
      backgroundColor: fade(props.bgColor, props.opacityHover),
    },
    transition: props.theme.transitions.create("background-color", {
      duration: 500,
    }),
  }),
});
