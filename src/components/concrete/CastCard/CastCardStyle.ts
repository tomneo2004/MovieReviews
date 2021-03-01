import { createStyles } from "@material-ui/core";

interface IStyleProps {
  width: string | number;
}
export default createStyles({
  root: (props: IStyleProps) => ({
    width: props.width,
  }),
});
