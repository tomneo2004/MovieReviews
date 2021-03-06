import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import React from "react";
import { getCircularRating } from "../../unit/CircularRating/CircularRating";
import PosterImage from "../PosterImage/PosterImage";
import Link from "next/link";
import style from "./MovieCardStyle";
import MovieIconURL from "../../../assets/placeholder/movie.svg";

type MoviePosterProps = React.ComponentProps<typeof Box> & {
  cardWidth: number;
  /**
   * this will be passed to PosterImage
   */
  linkTo?: string;
  src?: string;
  placeholderSrc?: string;
  imageRatio?: number;
  title: string;
  titleMaxHeight?: number;
  titleWrap?: boolean;
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
  onImageLoaded?: () => void;
};

const renderRating = (rating: number, xOffset: number, yOffset: number) => {
  const ratingComp = getCircularRating(rating);
  return (
    <Box position="absolute" top={yOffset} left={xOffset}>
      {ratingComp}
    </Box>
  );
};

/**
 * Component MovieCard
 *
 * Component wrpped `PosterImage` for displaying movie poster
 *
 * This component work best with `MovieCollection` component
 *
 * You must give width of card
 *
 * @param {MoviePosterProps} props
 */
const MovieCard: React.FC<MoviePosterProps> = (props: MoviePosterProps) => {
  const {
    cardWidth,
    linkTo = "#",
    src,
    placeholderSrc = MovieIconURL,
    imageRatio = 1.5,
    title,
    titleMaxHeight,
    titleWrap = true,
    releaseDate,
    ratingScore = null,
    ratingOffsetX = 0,
    ratingOffsetY = 0,
    onMouseOver = null,
    onImageLoaded,
    ...rest
  } = props;
  const theme = useTheme();
  const [showRating, setShowRating] = React.useState<boolean>(false);
  const classes = makeStyles(style)({
    theme,
  });

  const handleImageLoaded = () => {
    setShowRating(true);
    if (onImageLoaded) onImageLoaded();
  };

  return (
    <Box {...rest} width={cardWidth}>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={1}
      >
        <Link href={linkTo} passHref>
          <a onMouseOver={onMouseOver}>
            <Box 
            position='relative' 
            zIndex={-1}
            >
            <PosterImage
              src={src ? src : MovieIconURL}
              placeholderSrc={placeholderSrc}
              aspectRatio={imageRatio}
              elevation={4}
              hoverCursor="pointer"
              fixedWidth={cardWidth}
              onImageLoaded={handleImageLoaded}
            />
            </Box>
          </a>
        </Link>
        <Box pt={1} maxWidth="100%">
          <Typography className={classes.title} variant="h6" noWrap={titleWrap}>
            {title}
          </Typography>
          <Typography variant="subtitle1">{releaseDate}</Typography>
        </Box>
        {!showRating
          ? null
          : renderRating(ratingScore, ratingOffsetX, ratingOffsetY)}
      </Box>
    </Box>
  );
};

export default React.forwardRef((props: MoviePosterProps, _ref) => (
  <MovieCard {...props} />
));
