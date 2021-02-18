import { createStyles, Theme } from "@material-ui/core";

export interface ITabsStyleProps {
  theme: Theme;
  borderRadius: number;
}

export const tabsStyles = createStyles({
  root: (props: ITabsStyleProps) => ({
    borderRadius: props.borderRadius,
    // background: 'linear-gradient(60deg, #ab47bc, #8e24aa)',
    // background: `linear-gradient(180deg, 
    //         ${props.theme.palette.primary.dark} 0%,
    //         ${props.theme.palette.primary.main} 70%, 
    //         ${props.theme.palette.primary.light}) 100%`,
    backgroundColor: `${props.theme.palette.primary.main}`,
    padding: 0,
    minHeight:'inherit',
    maxHeight:'inherit',
    '& button':{
      minHeight:'inherit',
      maxHeight:'inherit',
    }
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
    color: `${props.theme.palette.getContrastText(props.theme.palette.primary.dark)}`,
  }),
});
