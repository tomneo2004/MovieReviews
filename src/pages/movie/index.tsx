import React from "react";
import Navigation from "../../components/concrete/Navigation/Navigation";
import PageLayout from "../../layouts/pageLayout";
import MovieLayout from "../../layouts/movie/movieLayout";
import PosterImage from "../../components/unit/PosterImage/PosterImage";
import { buildImageQuery } from "../../utils/api/query/apiQueryBuilder";
import Box from "@material-ui/core/Box";
import MovieInfo from "../../components/concrete/MovieInfo/MovieInfo";
import Typography from "@material-ui/core/Typography";
import { useMovieReviews } from "../../effects/apiFetch/movieReviews";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import CastCollection from "../../components/concrete/CastCollection/CastCollection";
import ReviewCollection from "../../components/concrete/ReviewCollection/ReviewCollection";
import { Divider, makeStyles, Modal } from "@material-ui/core";
import TrailerCollection from "../../components/concrete/VideoCollection/VideoCollection";
import { motion } from "framer-motion";
import { LayoutIdTypes } from "../../framer/LayoutIdTypes";
import { springTransition } from "../../framer/Transition";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { IMovieDetailData } from "../../utils/api/model/apiModelTypes";

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

const MoviePage = (pageProps: IPageProps) => {
  const { movieId, movieDetail, error } = pageProps;
  const reviews = useMovieReviews(Number(movieId));
  const [enlarge, setEnlarge] = React.useState<boolean>(false);

  useBottomScrollListener(() => {
    if (
      reviews.data &&
      reviews.data.page < reviews.data.total_pages &&
      !reviews.isLoading
    ) {
      reviews.setSize(reviews.size + 1);
    }
  });

  const classes = makeStyles({
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    pointer: {
      cursor: "pointer",
    },
  })();

  const motionDivStyle = {
    width: "fit-content",
    height: "fit-content",
    outline: "none",
  };

  const toggleEnlarge = () => setEnlarge((state) => !state);

  return (
    <PageLayout
      navigation={
          <Navigation position="sticky" />
      }
    >
      {error ? (
        <Typography variant="h4" component="div">
          <Box display="flex" justifyContent="center">
            {"Ooops, somthing is not right"}
          </Box>
        </Typography>
      ) : (
        <MovieLayout
          poster={
            enlarge ? null : (
              <motion.div
                layoutId={LayoutIdTypes.moviePosterImage}
                style={motionDivStyle}
                transition={springTransition()}
              >
                <PosterImage
                  className={classes.pointer}
                  onClick={toggleEnlarge}
                  imageURL={buildImageQuery(movieDetail.poster_path, "w342")}
                  imageWidth={342}
                />
              </motion.div>
            )
          }
          info={<MovieInfo movieDetailData={movieDetail} />}
        >
          <React.Fragment>
            {/* trailers */}
            <Box p={1}>
              <Divider variant="middle" />
            </Box>
            <Box pt={2}>
              <Typography component="div" variant="h4">
                <Box pl={2} fontWeight={600}>{`Videos`}</Box>
              </Typography>
              {movieDetail ? (
                <TrailerCollection trailersData={movieDetail.videos.results} />
              ) : (
                <TrailerCollection trailersData={null} />
              )}
            </Box>
            {/* casts */}
            <Box p={1}>
              <Divider variant="middle" />
            </Box>
            <Box pt={2}>
              <Typography component="div" variant="h4">
                <Box pl={2} fontWeight={600}>{`Casts`}</Box>
              </Typography>
              {movieDetail ? (
                <CastCollection castData={movieDetail.credits.cast} />
              ) : (
                <CastCollection castData={null} />
              )}
            </Box>
            {/* reviews */}
            <Box p={1}>
              <Divider variant="middle" />
            </Box>
            <Box pt={2} pb={2}>
              <Typography component="div" variant="h4">
                <Box pl={2} fontWeight={600}>{`Reviews`}</Box>
              </Typography>
              {reviews.data ? (
                <ReviewCollection
                  reviewData={reviews.data}
                  isLoadingMore={reviews.isLoading}
                />
              ) : (
                <ReviewCollection reviewData={null} />
              )}
            </Box>
            {/* enlarge image */}
            {!movieDetail || !enlarge ? null : (
              <Modal
                className={classes.modal}
                open={enlarge}
                onClose={toggleEnlarge}
              >
                <motion.div
                  layoutId={LayoutIdTypes.moviePosterImage}
                  style={motionDivStyle}
                  transition={springTransition()}
                >
                  <PosterImage
                    raised
                    onClick={toggleEnlarge}
                    imageURL={buildImageQuery(movieDetail.poster_path, "w342")}
                    imageWidth={342}
                  />
                </motion.div>
              </Modal>
            )}
          </React.Fragment>
        </MovieLayout>
      )}
    </PageLayout>
  );
};

export default MoviePage;
