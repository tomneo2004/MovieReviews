import Box from "@material-ui/core/Box/Box";
import InputBase from "@material-ui/core/InputBase/InputBase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import SearchSharp from "@material-ui/icons/SearchSharp";
import React from "react";
import style from "./SearchFieldStyle";

export type SearchFieldProps = React.ComponentProps<typeof InputBase> & {
  bgColor?: string;
  opacity?: number;
  opacityHover?: number;
  /**
   * icon infront of input
   */
  icon?: React.ReactElement;
};

const SearchField: React.FC<SearchFieldProps> = React.forwardRef(
  (props: SearchFieldProps, ref) => {
    const theme = useTheme();
    const {
      bgColor = theme.palette.common.white,
      opacity = 0.15,
      opacityHover = 0.25,
      icon = <SearchSharp />,
      endAdornment,
      id,
      ...restInput
    } = props;

    const classes = makeStyles(style)({
      theme,
      bgColor,
      opacity,
      opacityHover,
    });

    return (
      <Box id={id} className={classes.root} display="flex">
        <Box display="flex" justifyContent="center" alignItems="center" px={1}>
          {icon}
        </Box>
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <InputBase ref={ref} {...restInput} />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          {endAdornment}
        </Box>
      </Box>
    );
  }
);

export default SearchField;
