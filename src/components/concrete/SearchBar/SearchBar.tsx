import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/Box/Box";
import React from "react";
import SearchField from "../../unit/SearchField/SearchField";
import style from "./SearchBarStyle";

type SearchBarProps = React.ComponentProps<typeof SearchField> & {
  /**
   * when enter key pressed
   */
  onEnter?: (value: string) => void;
  onValueChange?: (value: string) => void;
  inputWidth?: string;
  inputFocusWidth?: string;
};

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const {
    onEnter = null,
    onValueChange = null,
    inputWidth = "50%",
    inputFocusWidth = "100%",
    id,
    ...rest
  } = props;

  const theme = useTheme();
  const [search, setSearch] = React.useState<string>("");
  const [width, setWidth] = React.useState<string>(inputWidth);
  const inputRef = React.useRef<HTMLInputElement>();

  const classes = makeStyles(style)({
    theme,
    width,
  });

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(event.target.value);
    if (onValueChange) onValueChange(event.target.value);
  };

  const handlSearchKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && search && onEnter) {
      console.log(inputRef.current);
      if (inputRef.current) inputRef.current.blur();
      onEnter(search);
    }
  };

  const handleOnFocus = () => {
    setWidth(inputFocusWidth);
  };

  const handleOnBlur = () => {
    setWidth(inputWidth);
  };

  return (
    <Box id={id} className={classes.root}>
      <SearchField
        {...rest}
        ref={inputRef}
        value={search}
        opacity={0.5}
        opacityHover={0.7}
        onKeyPress={handlSearchKeyPress}
        onChange={handleSearchChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </Box>
  );
};

export default SearchBar;
