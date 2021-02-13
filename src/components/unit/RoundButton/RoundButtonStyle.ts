import createStyles from "@material-ui/core/styles/createStyles";

type IStyleProps = {
  cornerRadius: string | number;
};

export default createStyles({
  root: (props: IStyleProps) => ({
    borderRadius: props.cornerRadius,
  }),
});
