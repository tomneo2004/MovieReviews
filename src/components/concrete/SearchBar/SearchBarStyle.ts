import { createStyles, Theme } from "@material-ui/core";

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
