import Box from "@material-ui/core/Box";
import dynamic from "next/dynamic";
import React from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useMovieReviews } from "../../../effects/apiFetch/movieReviews";

const ReviewCollection = dynamic(
  ()=>import("../ReviewCollection/ReviewCollection"),
)

type ReviewsProps = React.ComponentProps<typeof Box> & {
  movieId: number;
};

const Reviews: React.FC<ReviewsProps> = (props: ReviewsProps) => {
  const { movieId, ...rest } = props;

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
    <Box {...rest} pt={2} pb={2}>
      {reviews.data ? (
        <ReviewCollection
          reviewData={reviews.data}
          isLoadingMore={reviews.isLoading}
        />
      ) : (
        <ReviewCollection reviewData={null} />
      )}
    </Box>
  );
};

export default Reviews;
