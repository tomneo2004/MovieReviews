import { createStyles } from "@material-ui/core";

interface IStyleProps {
  compact: boolean;
  thumbWidth: number;
  thumbHeight: number;
}

export default createStyles({
  paper: {
    height: "75%",
    overflow: "visible",
  },
  media: (props: IStyleProps) => ({
    width: props.thumbWidth,
    height: props.thumbHeight,
  }),
  fab: (props: IStyleProps) => ({
    position: "absolute",
    right: props.compact ? 0 : "-5px",
    top: props.compact ? 0 : "-5px",
  }),
});
