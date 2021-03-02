import Box from "@material-ui/core/Box/Box";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import { useRouter } from "next/router";
import React from "react";
import { getRoute, RouteType } from "../../../routes/routesGenerator";
import SearchBar from "../SearchBar/SearchBar";

type HeroSearchBarProps = React.ComponentProps<typeof Box>;

const HeroSearchBar: React.FC<HeroSearchBarProps> = (
  props: HeroSearchBarProps
) => {
  const { ...rest } = props;

  const router = useRouter();
  const [keywords, setKeywords] = React.useState<string>("");

  const handleSearchClick = () => {
    if (!keywords) return;
    router.push(getRoute(RouteType.search, { query: keywords }));
  };

  const handleEnterSearch = (value: string) => {
    if (!value) return;
    router.push(getRoute(RouteType.search, { query: value }));
  };

  const handleSearchValueChange = (value: string) => {
    setKeywords(value);
  };
  return (
    <Box {...rest} width="100%" display="flex" justifyContent="center">
      <Paper elevation={10}>
        <SearchBar
          fullWidth
          placeholder="Title ..."
          opacity={0.5}
          opacityHover={0.7}
          inputWidth="20em"
          inputFocusWidth="24em"
          endAdornment={
            <Button variant="contained" onClick={handleSearchClick}>
              Search
            </Button>
          }
          onValueChange={handleSearchValueChange}
          onEnter={handleEnterSearch}
        />
      </Paper>
    </Box>
  );
};

export default HeroSearchBar;
