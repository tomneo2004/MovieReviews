import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";

interface IStyleProps {
  theme: Theme;
  width: string;
}

export default createStyles({
  root: (props: IStyleProps) => ({
    width: props.width,
    transition: props.theme.transitions.create("width"),
  }),
});
