import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";

export interface ITabsStyleProps {
  theme: Theme;
  borderRadius: number;
}

export const tabsStyles = createStyles({
  root: (props: ITabsStyleProps) => ({
    borderRadius: props.borderRadius,
    backgroundColor: `${props.theme.palette.primary.main}`,
    padding: 0,
    minHeight: "inherit",
    maxHeight: "inherit",
    "& button": {
      minHeight: "inherit",
      maxHeight: "inherit",
    },
  }),
  indicator: (props: ITabsStyleProps) => ({
    height: "100%",
    borderRadius: props.borderRadius,
    background: "rgba(235, 235, 235, 0.5)",
  }),
});

export interface ITabItemStyleProps {
  theme: Theme;
}

export const tabItemStyles = createStyles({
  root: {
    textTransform: "initial",
    minWidth: 0,
  },

  wrapper: (props: ITabItemStyleProps) => ({
    fontWeight: props.theme.typography.fontWeightBold,
    fontSize: "1.5em",
    letterSpacing: 0.5,
    color: `${props.theme.palette.getContrastText(
      props.theme.palette.primary.dark
    )}`,
  }),
});
