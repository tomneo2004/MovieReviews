import { fade } from "@material-ui/core/styles/colorManipulator";
import Hidden from "@material-ui/core/Hidden/Hidden";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/Box/Box";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import React from "react";
import { IMovieData } from "../../../utils/api/model/apiModelTypes";
import {
  BackdropSize,
  getBackdropImageQuery,
} from "../../../utils/api/query/apiQueryBuilder";
import BackgroundImage from "../BackgroundImage/BackgroundImage";
import FancyTab from "../FancyTab/FancyTab";
import PhantomText from "../PhantomText/PhantomText";
import TrendingIcon from "../../../assets/icons/trend.inline.svg";
import MovieCollection from "../MovieCollection/MovieCollection";
import SectionHeader from "../SectionHeader/SectionHeader";
import config from "../../../config/config";

let timerHandler: NodeJS.Timeout;

const tabData = [
  { id: "day", value: "day", label: "To day" },
  { id: "week", value: "week", label: "This week" },
];

type SnippetTrendingProps = React.ComponentProps<typeof Box> & {
  byDay: IMovieData[];
  byWeek: IMovieData[];
};

const SnippetTrending: React.FC<SnippetTrendingProps> = (
  props: SnippetTrendingProps
) => {
  const { byDay, byWeek, ...rest } = props;

  const theme = useTheme();
  const [trendingBg, setTrendingBg] = React.useState<string>("");
  const [movieData, setMovieData] = React.useState<IMovieData[]>(byDay);

  const handleMovieHover = (index: number) => {
    const data = movieData[index];
    setTrendingBg(
      getBackdropImageQuery(data.backdrop_path, BackdropSize.original)
    );
  };

  const handleWindowChange = (value: any) => {
    timerHandler = setTimeout(() => {
      if (String(value) === "day") {
        setMovieData(byDay);
      } else if (String(value) === "week") {
        setMovieData(byWeek);
      }
      clearTimeout(timerHandler);
    }, 500);
  };

  return (
    <Box {...rest}>
      <SectionHeader
        px={2}
        bgcolor={theme.palette.primary.main}
        header={
          <React.Fragment>
            <Hidden smDown>
              <PhantomText
                height="100%"
                bgcolor={theme.palette.primary.light}
                px={1}
                text="Trending"
                charDelayDefs={{
                  0: { enter: 1, exit: 0 },
                  1: { enter: 1.3, exit: 0 },
                  2: { enter: 1.6, exit: 0 },
                  3: { enter: 1.9, exit: 0 },
                  4: { enter: 2.2, exit: 0 },
                  5: { enter: 2.5, exit: 0 },
                  6: { enter: 2.8, exit: 0 },
                  7: { enter: 3.1, exit: 0 },
                }}
              />
            </Hidden>
            <Hidden mdUp>
              <Box
                bgcolor={theme.palette.primary.light}
                display="flex"
                p={1}
                justifyContent="center"
                alignItems="center"
              >
                <SvgIcon fontSize="large">
                  <TrendingIcon />
                </SvgIcon>
              </Box>
            </Hidden>
          </React.Fragment>
        }
        items={[
          <FancyTab
            key="tab"
            px={1}
            bgcolor={theme.palette.primary.light}
            tabData={tabData}
            onChange={handleWindowChange}
          />,
        ]}
      />
      <BackgroundImage
        imageSrc={trendingBg}
        backdropColor={fade(theme.palette.primary.light, 0.6)}
        keyframesAnimIn={{
          "0%": { transform: "translate(100%)" },
          "100%": { transform: "translate(0%)" },
        }}
        keyframesAnimOut={{
          "0%": { transform: "translate(0%)" },
          "100%": { transform: "translate(-100%)" },
        }}
        animOutTimeFun="ease"
        animInTimeFun="ease"
        loadingIndicator={
          <Box>
            <LinearProgress />
          </Box>
        }
      >
        <MovieCollection
          collectionHeight={config.Movie_Collection_Height}
          itemWidth={config.Movie_Collection_Item_Width}
          imageRatio={config.Movie_Collection_Image_Ratio}
          posterSize={config.Movie_Collection_Poster_Size}
          movieData={movieData}
          onHover={handleMovieHover}
        />
      </BackgroundImage>
    </Box>
  );
};

export default SnippetTrending;
