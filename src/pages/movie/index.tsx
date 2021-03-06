import React from "react";
import PageLayout from "../../layouts/pageLayout";
import Box from "@material-ui/core/Box/Box";
import Hidden from "@material-ui/core/Hidden/Hidden";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tab from "@material-ui/core/Tab/Tab";
import Tabs from "@material-ui/core/Tabs/Tabs";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next/types/index";
import {
  ICastData,
  IMovieDetailData,
  IMoviePosterData,
  IRecommendationMoviesData,
  ISimilarMoviesData,
  IStreamProvidersData,
  IVideoData,
} from "../../utils/api/model/apiModelTypes";
import { getRoute, RouteType } from "../../routes/routesGenerator";
import CommonNavigation from "../../components/concrete/CommonNavigation/CommonNavigation";
import {
  fetchMovieDetail,
  fetchRecommendations,
  fetchSimilars,
  fetchWatchProvider,
  IPageProps,
} from "../../pageUtils/movie";
import Overview from "../../components/concrete/Overview/Overview";
import SnippetMedia from "../../components/concrete/SnippetMedia/SnippetMedia";
import Reviews from "../../components/concrete/Reviews/Reviews";
import SnippetRecommendation from "../../components/concrete/SnippetRecommendation/SnippetRecommendation";
import SnippetSimilar from "../../components/concrete/SnippetSimilar/SnippetSimilar";
import CastCollection from "../../components/concrete/CastCollection/CastCollection";
import config from "../../config/config";
import { useCountryCode } from "../../effects/apiFetch/countryCode";
import StreamServices from "../../components/concrete/StreamServices/StreamServices";

export const getServerSideProps: GetServerSideProps<IPageProps> = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const { id } = query as { [key: string]: string };

  if (!id) {
    return {
      props: {
        movieId: null,
        movieDetail: null,
        recommendations: null,
        similars: null,
        watchProviders: null,
        error: "Movie id was not given",
      },
    };
  }

  try {
    const movieDetail = await fetchMovieDetail(id);
    const recommendations = await fetchRecommendations(id);
    const similars = await fetchSimilars(id);
    const watchProviders = await fetchWatchProvider(id);

    return {
      props: {
        movieId: id,
        movieDetail: movieDetail,
        recommendations,
        similars,
        watchProviders,
        error: null,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        movieId: null,
        movieDetail: null,
        recommendations: null,
        similars: null,
        watchProviders: null,
        error: e.message,
      },
    };
  }
};

enum SectionTypes {
  "overview" = "overview",
  "media" = "media",
  "casts" = "casts",
  "watch" = "watch",
}

type SectionMapToData = {
  [SectionTypes.overview]: {
    movieDetails: IMovieDetailData;
    recommendations: IRecommendationMoviesData;
    similars: ISimilarMoviesData;
  };
  [SectionTypes.media]: {
    trailers: IVideoData[];
    posters: IMoviePosterData[];
  };
  [SectionTypes.casts]: ICastData[];
  [SectionTypes.watch]: {
    provider: IStreamProvidersData;
    countryName: string;
  };
};

/**
 * Render each section by section type
 * @param {SectionTypes} section section type
 * @param {SectionMapToData} data data associate to each section
 * @param movieId movie id
 */
const renderSection = (
  section: SectionTypes,
  data: SectionMapToData,
  movieId: string
) => {
  switch (section) {
    case SectionTypes.overview:
      const movieDetails = data[section].movieDetails;

      return (
        <React.Fragment>
          <Overview movieDetail={movieDetails} />
        </React.Fragment>
      );
    case SectionTypes.media:
      //10 trailers
      const trailerSplice = [...data[section].trailers];
      const trailers = trailerSplice.splice(0, 9);

      //10 posters
      const posterSplice = [...data[section].posters];
      const posters = posterSplice.splice(0, 9);

      return (
        <SnippetMedia
          trailers={{
            snippetData: trailers,
            routeToPage: getRoute(RouteType["movie video"], null, movieId),
          }}
          posters={{
            snippetData: posters,
            routeToPage: getRoute(RouteType["movie poster"], null, movieId),
          }}
        />
      );
    case SectionTypes.casts:
      return (
        <CastCollection
          collectionHeight={config.Cast_Collection_Height}
          itemWidth={config.Cast_Collection_Item_Width}
          imageRatio={config.Cast_Collection_Image_Ratio}
          profileSize={config.Cast_Collection_Image_Profile_Size}
          castData={data[section]}
        />
      );
    case SectionTypes.watch:
      const provider = data[section].provider;
      const countryName = data[section].countryName;

      return <StreamServices provider={provider} countryName={countryName} />;
  }
};

const renderTabs = (
  section: SectionTypes,
  sectionChangeHandler: (
    _evt: React.ChangeEvent<{}>,
    value: SectionTypes
  ) => void
) => {
  const theme = useTheme();
  const classes = makeStyles({
    indicator: (theme: Theme) => ({
      backgroundColor: theme.palette.primary.dark,
      height: "6px",
      borderRadius: "4px",
    }),
  })(theme);
  return (
    <Tabs
      classes={{ indicator: classes.indicator }}
      value={section}
      onChange={sectionChangeHandler}
      centered
    >
      <Tab value={SectionTypes.overview} label="Overview" />
      <Tab value={SectionTypes.media} label="Media" />
      <Tab value={SectionTypes.casts} label="Casts" />
      <Tab value={SectionTypes.watch} label="Watch" />
    </Tabs>
  );
};

const MoviePage = (pageProps: IPageProps) => {
  const {
    movieId,
    movieDetail,
    recommendations,
    similars,
    watchProviders,
    error,
  } = pageProps;
  const theme = useTheme();
  const countryCode = useCountryCode();
  const [section, setSection] = React.useState<SectionTypes>(
    SectionTypes.overview
  );
  const sectionToData = React.useMemo<SectionMapToData>(() => {
    return {
      overview: {
        movieDetails: movieDetail,
        recommendations,
        similars,
      },
      media: {
        trailers: movieDetail.videos.results,
        posters: movieDetail.images.posters,
      },
      casts: movieDetail.credits.cast,
      watch: {
        provider:
          countryCode.isLoading || countryCode.error
            ? null
            : watchProviders.results[countryCode.data.countryCode],
        countryName:
          countryCode.isLoading || countryCode.error
            ? " your country"
            : countryCode.data.countryName,
      },
    };
  }, [movieId, countryCode]);

  if (error) throw error;

  const handleSectionChange = (
    _evt: React.ChangeEvent<{}>,
    value: SectionTypes
  ) => {
    setSection(value);
  };

  return (
    <PageLayout
      navigation={
        <CommonNavigation
          elevation={8}
          middleButtons={[
            <Hidden smDown>{renderTabs(section, handleSectionChange)}</Hidden>,
          ]}
        />
      }
    >
      <Box bgcolor={theme.palette.primary.light}>
        <Hidden mdUp>{renderTabs(section, handleSectionChange)}</Hidden>
        <Box p={2}>{renderSection(section, sectionToData, movieId)}</Box>
        {recommendations.results.length === 0 ? null : (
          <SnippetRecommendation
            px={2}
            pt={2}
            recommendations={recommendations.results}
          />
        )}
        {similars.results.length === 0 ? null : (
          <SnippetSimilar px={2} similars={similars.results} pt={2} />
        )}
        <Reviews px={2} movieId={movieId} />
      </Box>
    </PageLayout>
  );
};

export default MoviePage;
