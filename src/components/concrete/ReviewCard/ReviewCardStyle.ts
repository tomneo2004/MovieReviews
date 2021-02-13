import { Theme } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

export default createStyles({
  expand: (theme: Theme) => ({
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
      easing: "ease",
    }),
  }),
  expandOpen: {
    transform: "rotate(180deg)",
  },
});
