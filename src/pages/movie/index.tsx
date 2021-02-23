import React, { useMemo } from "react";
import PageLayout from "../../layouts/pageLayout";
import { buildImageQuery } from "../../utils/api/query/apiQueryBuilder";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Hidden, makeStyles, Tab, Tabs, Theme, useTheme } from "@material-ui/core";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ICastData, IMovieDetailData, IMoviePosterData, IVideoData } from "../../utils/api/model/apiModelTypes";
import { getRoute, RouteType } from "../../routes/routesGenerator";
import { useRouter } from "next/router";
import Overview from "../../components/concrete/Overview/Overview";
import Media from "../../components/concrete/Media/Media";
import Casts from "../../components/concrete/Casts/Casts";
import Reviews from "../../components/concrete/Reviews/Reviews";
import CommonNavigation from "../../components/concrete/CommonNavigation/CommonNavigation";

interface IPageProps {
  movieId: string;
  movieDetail: IMovieDetailData;
  error: any;
}
const apiMovieDetailRoute = `${
  process.env.NEXT_PUBLIC_WEBSITE_ROUTE || ""
}/api/detail/movies`;

const fetchMovieDetail = async (movieId: string) => {
  try {
    const resp = await axios.get(`${apiMovieDetailRoute}?id=${movieId}`);
    const data: IMovieDetailData = resp.data;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const { id } = query as { [key: string]: string };

  if (!id) {
    return {
      props: {
        movieId: null,
        movieDetail: null,
        error: "Movie id was not given",
      },
    };
  }

  try {
    const movieDetail = await fetchMovieDetail(id);

    return {
      props: {
        movieId: id,
        movieDetail: movieDetail,
        error: null,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        movieId: null,
        movieDetail: null,
        error: e.message,
      },
    };
  }
};

enum SectionTypes {
  'overview' = 'overview',
  'media' = 'media',
  'casts' = 'casts',
  'reviews' = 'reviews',
}

type SectionMapToData = {
  [SectionTypes.overview]: IMovieDetailData,
  [SectionTypes.media]: {
    trailers: IVideoData[],
    poster: IMoviePosterData[],
  }
  [SectionTypes.casts]: ICastData[],
  [SectionTypes.reviews]: number,
}

const renderSection = (section:SectionTypes, data:SectionMapToData, movieId:string)=>{
  switch(section){
    case SectionTypes.overview:
      return <Overview movieDetail={data[section]} />;
    case SectionTypes.media:
      return (<Media 
              trailers={{
                snippetData: data[section].trailers,
                routeToPage: getRoute(RouteType["movie video"], null, movieId)
              }} 
              posters={{
                snippetData: data[section].poster,
                routeToPage: getRoute(RouteType["movie poster"], null, movieId)
              }} 
              />);
    case SectionTypes.casts:
      return <Casts casts={data[section]} />;
    case SectionTypes.reviews:
      return <Reviews movieId={data[section]} />
  }
}

const renderTabs = (section:SectionTypes, 
  sectionChangeHandler:(_evt:React.ChangeEvent<{}>, value:SectionTypes)=>void)=>{

  const theme = useTheme();  
  const classes = makeStyles({
    indicator:(theme:Theme)=>({
      backgroundColor:theme.palette.primary.dark,
      height:'6px',
      borderRadius:'4px'
    })
  })(theme);
  return ( 
      <Tabs
      classes={{indicator:classes.indicator}}
      value={section}
      onChange={sectionChangeHandler}
      centered
      >
          <Tab value={SectionTypes.overview} label="Overview" />
          <Tab value={SectionTypes.media} label="Media" />
          <Tab value={SectionTypes.casts} label="Casts" />
          <Tab value={SectionTypes.reviews} label="Reviews" />
      </Tabs>
  )
}

const MoviePage = (pageProps: IPageProps) => {
  const { movieId, movieDetail, error } = pageProps;
  const router = useRouter(); 
  const theme = useTheme();
  const backdropPath = useMemo(
    ()=>buildImageQuery(movieDetail.backdrop_path, 'original'),
    [movieDetail.backdrop_path]
  );
  const [section, setSection] = React.useState<SectionTypes>(SectionTypes.overview);
  const sectionToData = React.useMemo<SectionMapToData>(()=>{
    return {
      overview: movieDetail,
      media: {trailers: movieDetail.videos.results, poster:movieDetail.images.posters},
      casts: movieDetail.credits.cast,
      reviews: Number(movieId)
    }
  }, []);

  const handleSectionChange = (_evt:React.ChangeEvent<{}>, value:SectionTypes)=>{
    setSection(value);
  }

  return (
    <PageLayout
      backgroundURL={backdropPath}
      banner={
        !backdropPath? 
          null 
          :
          <Box width='inherit' height='400px' />
      }
      navigation={
          <CommonNavigation 
          elevation={8} 
          // onSearch={handleSearch} 
          middleButtons={[
            <Hidden smDown>
              {renderTabs(section, handleSectionChange)}
            </Hidden>
          ]}
          />


      }
    >
      {error ? (
        <Typography variant="h4" component="div">
          <Box display="flex" justifyContent="center">
            {"Ooops, somthing is not right"}
          </Box>
        </Typography>
      ) : (
        <Box bgcolor={theme.palette.primary.light}>
            <Hidden mdUp>
            {renderTabs(section, handleSectionChange)}
            </Hidden>
            <Box p={2}>
                {renderSection(section, sectionToData, movieId)}
            </Box>
        </Box>
      )}
    </PageLayout>
  );
};

export default MoviePage;
