import React, { useMemo } from "react";
import PageLayout from "../../layouts/pageLayout";
import { buildImageQuery } from "../../utils/api/query/apiQueryBuilder";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Hidden, makeStyles, Tab, Tabs, Theme, useTheme } from "@material-ui/core";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ICastData, IMovieDetailData, IVideoData } from "../../utils/api/model/apiModelTypes";
import SearchNavigation from "../../components/concrete/SearchNavigation/SearchNavigation";
import { getRoute, RouteType } from "../../routes/routesGenerator";
import { useRouter } from "next/router";
import Overview from "../../components/concrete/Overview/Overview";
import Media from "../../components/concrete/Media/Media";
import Casts from "../../components/concrete/Casts/Casts";
import Reviews from "../../components/concrete/Reviews/Reviews";
import PhantomText from "../../components/concrete/PhantomText/PhantomText";
import SectionHeader from "../../components/concrete/SectionHeader/SectionHeader";

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
  'casts' = 'casts'
}

type SectionMapToData = {
  [SectionTypes.overview]: IMovieDetailData,
  [SectionTypes.media]: {
    trailers: IVideoData[],
    gallery: []
  }
  [SectionTypes.casts]: ICastData[],
}

const renderSection = (section:SectionTypes, data:SectionMapToData)=>{
  switch(section){
    case SectionTypes.overview:
      return <Overview movieDetail={data[section]} />;
    case SectionTypes.media:
      return (<Media 
              trailers={data[section].trailers} 
              gallery={data[section].gallery} />);
    case SectionTypes.casts:
      return <Casts casts={data[section]} />;
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
      media: {trailers: movieDetail.videos.results, gallery:[]},
      casts: movieDetail.credits.cast
    }
  }, []);

  const handleSearch = (value: string) => {
    router.push(getRoute(RouteType.search, { query: value }));
  };

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
          <SearchNavigation 
          elevation={8} 
          onSearch={handleSearch} 
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
                {renderSection(section, sectionToData)}
            </Box>
            <Box px={2}>
            <SectionHeader 
              px={2}
              bgcolor={theme.palette.primary.main}
              header={
                <PhantomText height='100%' bgcolor={theme.palette.primary.light} px={1}
                text='Reviews' 
                charDelayDefs={{
                  0:{enter:1, exit:0},
                  1:{enter:1.3, exit:0},
                  2:{enter:1.6, exit:0},
                  3:{enter:1.9, exit:0},
                  4:{enter:2.2, exit:0},
                  5:{enter:2.5, exit:0},
                  6:{enter:2.8, exit:0},
                }}
                />
              }
            />
            <Reviews movieId={Number(movieId)} />
            </Box>
        </Box>
      )}
    </PageLayout>
  );
};

export default MoviePage;
