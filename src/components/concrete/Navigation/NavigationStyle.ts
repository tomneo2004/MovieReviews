import { createStyles, Theme } from "@material-ui/core";

interface IStyleProps {
  theme: Theme;
}
export default createStyles({
  appBar: (props: IStyleProps) => ({
    background: `linear-gradient(180deg, 
            ${props.theme.palette.primary.light} 0%,
            ${props.theme.palette.primary.main} 40%, 
            ${props.theme.palette.primary.dark}) 100%`,
  }),
});
