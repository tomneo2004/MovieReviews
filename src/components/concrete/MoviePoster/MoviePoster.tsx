import { makeStyles, Typography, useTheme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
import { getCircularRating } from "../../unit/CircularRating/CircularRating";
import PosterImage from "../PosterImage/PosterImage";
import Link from "next/link";
import style from "./MoviePosterStyle";
import { ScreenWidthProps } from "../../../props/ScreenProps";

type MoviePosterProps = React.ComponentProps<typeof Box> & {
  /**
   * this will be passed to PosterImage
   */
  layoutId?: string;
  linkTo?: string;
  imageURL?: string;
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

const widthDef: ScreenWidthProps = {
  widthAtSMDown: 185,
  widthAtSMUp: 185,
  widthAtMDUp: 250,
  widthAtLGUp: 300,
  widthAtXLUp: 300,
};

const Poster: React.FC<MoviePosterProps> = (props: MoviePosterProps) => {
  const {
    layoutId,
    linkTo = "#",
    imageURL = "",
    title,
    releaseDate,
    ratingScore = null,
    ratingOffsetX = 0,
    ratingOffsetY = 0,
    onMouseOver = null,
    ...rest
  } = props;
  const theme = useTheme();
  const classes = makeStyles(style)({
    theme,
    ...widthDef,
  });

  return (
    <Box
      {...rest}
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={1}
    >
      <Link href={linkTo}>
        <PosterImage
          layoutId={layoutId}
          imageURL={imageURL}
          elevation={4}
          onMouseOver={onMouseOver}
          hoverCursor="pointer"
          widthAtSMDown={widthDef.widthAtSMDown}
          widthAtSMUp={widthDef.widthAtSMUp}
          widthAtMDUp={widthDef.widthAtMDUp}
          widthAtLGUp={widthDef.widthAtLGUp}
          widthAtXLUp={widthDef.widthAtXLUp}
        />
      </Link>
      <Typography component="div" variant="h6">
        <Box className={classes.title} pt={1} textAlign="center">
          {title}
        </Box>
      </Typography>
      <Typography component="div" variant="subtitle1">
        <Box fontWeight="600">{releaseDate}</Box>
      </Typography>
      {renderRating(ratingScore, ratingOffsetX, ratingOffsetY)}
    </Box>
  );
};

export default React.forwardRef((props: MoviePosterProps, _ref) => (
  <Poster {...props} />
));
