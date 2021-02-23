import { Box, InputBase, makeStyles, useTheme } from "@material-ui/core";
import { SearchSharp } from "@material-ui/icons";
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

  // /**
  //  * On input field focus callback
  //  */
  // onFocus?: () => void;
};

const SearchField: React.FC<SearchFieldProps> = React.forwardRef(
  (props: SearchFieldProps, ref) => {
    const theme = useTheme();
    const {
      bgColor = theme.palette.common.white,
      opacity = 0.15,
      opacityHover = 0.25,
      icon = <SearchSharp />,
      // onFocus,
      endAdornment,
      id,
      ...restInput
    } = props;
    // const inputRef = React.useRef<HTMLInputElement>();

    // React.useEffect(() => {
    //   inputRef.current.onfocus = onFocus;
    //   return () => {
    //     inputRef.current.onfocus = null;
    //   };
    // }, []);

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
          <InputBase
            ref={ref}
            // inputRef={inputRef}
            // className={classes.input}
            {...restInput}
          />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          {endAdornment}
        </Box>
      </Box>
    );
  }
);

export default SearchField;
