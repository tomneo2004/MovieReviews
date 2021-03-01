import { RootRef, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
import MovieIconURL from "../../../assets/placeholder/movie.svg";
import { getCircularRating } from "../../unit/CircularRating/CircularRating";
import PosterImage from "../PosterImage/PosterImage";
import Measure from "react-measure";
import Link from "next/link";

type SearchCardProps = React.ComponentProps<typeof Box> & {
  linkTo?: string;
  src?: string;
  placeholderSrc?: string;
  imageWidth: number;
  imageRatio?: number;
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
  ratingScoreOffsetX?: number;
  ratingScoreOffsetY?: number;
  onImageLoaded?: () => void;
  onResize?: () => void;
};

const SearchCard: React.FC<SearchCardProps> = (props: SearchCardProps) => {
  const {
    linkTo = "#",
    src,
    placeholderSrc = MovieIconURL,
    imageWidth,
    imageRatio = 1.5,
    title,
    releaseDate,
    ratingScore,
    ratingScoreOffsetX = 4,
    ratingScoreOffsetY = 2,
    onImageLoaded,
    onResize,
    ...rest
  } = props;

  const [showScore, setShowScore] = React.useState<boolean>(false);

  const handleImageLoaded = () => {
    setShowScore(true);
    if (onImageLoaded) onImageLoaded();
  };

  return (
    <Measure onResize={onResize}>
      {({ measureRef }) => (
        <RootRef rootRef={measureRef}>
          <Box {...rest}>
            <Box display="flex" flexWrap="wrap">
              <Link href={linkTo} passHref>
                <a>
                  <PosterImage
                    src={src ? src : MovieIconURL}
                    placeholderSrc={placeholderSrc}
                    aspectRatio={imageRatio}
                    elevation={4}
                    onImageLoaded={handleImageLoaded}
                    fixedWidth={imageWidth}
                    hoverCursor="pointer"
                  />
                </a>
              </Link>

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                pl={2}
              >
                <Typography variant="h4">{title}</Typography>
                <Typography variant="h6">{releaseDate}</Typography>
              </Box>
            </Box>
            {!showScore ? null : (
              <Box
                position="absolute"
                top={ratingScoreOffsetX}
                left={ratingScoreOffsetY}
              >
                {getCircularRating(ratingScore)}
              </Box>
            )}
          </Box>
        </RootRef>
      )}
    </Measure>
  );
};

export default SearchCard;
