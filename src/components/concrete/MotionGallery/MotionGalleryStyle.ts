import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import { fade } from "@material-ui/core/styles/colorManipulator";

interface IMotionGalleryStyle {
  theme: Theme;
}

export default createStyles({
  button: (props: IMotionGalleryStyle) => ({
    backgroundColor: fade(props.theme.palette.primary.light, 0.7),
  }),
});
