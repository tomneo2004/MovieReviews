import createStyles from "@material-ui/core/styles/createStyles";

interface IStyleProps {
  width: string | number;
}
export default createStyles({
  root: (props: IStyleProps) => ({
    width: props.width,
  }),
});
