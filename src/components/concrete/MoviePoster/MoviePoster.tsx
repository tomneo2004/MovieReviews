import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/styles/makeStyles";
import style from "./MoviePosterStyle";
import React from "react";
import { getCircularRating } from "../../unit/CircularRating/CircularRating";
import PosterImage from "../../unit/PosterImage/PosterImage";
import Link from "next/link";

type MoviePosterProps = React.ComponentProps<typeof Box> & {
  linkTo?: string;
  imageURL?: string;
  imageWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  title: string;
  releaseDate: string;
  /**
   * Rating score 0 ~ 100
   *
   * null to hide rating
   *
   * default null
   */
  ratingScore?: number;
  ratingOffsetX?: number;
  ratingOffsetY?: number;
  onMouseOver?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const renderRating = (rating: number, xOffset: number, yOffset: number) => {
  const ratingComp = getCircularRating(rating);
  return (
    <Box position="absolute" top={yOffset} left={xOffset}>
      {ratingComp}
    </Box>
  );
};

const Poster: React.FC<MoviePosterProps> = (props: MoviePosterProps) => {
  const {
    linkTo = '#', 
    imageURL = "",
    imageWidth = 150,
    minWidth = imageWidth,
    maxWidth,
    title,
    releaseDate,
    ratingScore = null,
    ratingOffsetX = 0,
    ratingOffsetY = 0,
    onMouseOver = null,
    ...rest
  } = props;

  const classes = makeStyles(style)();

  return (
    <Box
      {...rest}
      position="relative"
      minWidth={minWidth}
      maxWidth={maxWidth ? maxWidth : "inherit"}
      p={1}
    >
      <Link href={linkTo}>
        <PosterImage
          imageURL={imageURL}
          elevation={4}
          className={classes.hoverPointer}
          onMouseOver={onMouseOver}
          imageWidth={imageWidth}
        />
      </Link>
      <Typography component="div" variant="h6">
        <Box pt={1}>
          {title}
        </Box>
      </Typography>
      <Typography component="div" variant="subtitle1">
        <Box display="flex" alignItems="center">
          {releaseDate}
        </Box>
      </Typography>
      {renderRating(ratingScore, ratingOffsetX, ratingOffsetY)}
    </Box>
  );
};

export default React.forwardRef((props: MoviePosterProps, _ref) => (
  <Poster {...props} />
));
