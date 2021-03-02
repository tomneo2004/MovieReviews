import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/Box/Box";
import React from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useMovieReviews } from "../../../effects/apiFetch/movieReviews";
import PhantomText from "../PhantomText/PhantomText";
import ReviewCollection from "../ReviewCollection/ReviewCollection";
import SectionHeader from "../SectionHeader/SectionHeader";

type ReviewsProps = React.ComponentProps<typeof Box> & {
  movieId: string;
};

const Reviews: React.FC<ReviewsProps> = (props: ReviewsProps) => {
  const { movieId, ...rest } = props;
  const theme = useTheme();
  const reviews = useMovieReviews(movieId);

  useBottomScrollListener(() => {
    if (
      reviews.data &&
      reviews.data.page < reviews.data.total_pages &&
      !reviews.isLoading
    ) {
      reviews.setSize(reviews.size + 1);
    }
  });

  return (
    <Box {...rest}>
      <SectionHeader
        px={2}
        bgcolor={theme.palette.primary.main}
        header={
          <PhantomText
            height="100%"
            bgcolor={theme.palette.primary.light}
            px={1}
            text={`Reviews`}
            charDelayDefs={{
              0: { enter: 1, exit: 0 },
              1: { enter: 1.2, exit: 0 },
              2: { enter: 1.4, exit: 0 },
              3: { enter: 1.6, exit: 0 },
              4: { enter: 1.8, exit: 0 },
              5: { enter: 2, exit: 0 },
              6: { enter: 2.2, exit: 0 },
            }}
          />
        }
      />
      {reviews.data ? (
        <ReviewCollection
          py={2}
          px={2}
          reviewData={reviews.data}
          isLoadingMore={reviews.isLoading}
        />
      ) : (
        <ReviewCollection py={2} px={2} reviewData={null} />
      )}
    </Box>
  );
};

export default Reviews;
