// import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import React from "react";
import { CardContent, makeStyles, Typography } from "@material-ui/core";
// import Box from "@material-ui/core/Box";
import style from "./CastCardStyle";

// import imagePlacehoder from "../../../assets/placeholder/poster.svg";
import PosterImage from "../PosterImage/PosterImage";
import ProfileIconRUL from "../../../assets/placeholder/profile.svg";

type CastCardProps = React.ComponentProps<typeof Card> & {
  cardWidth: number;
  src?: string;
  placeholderSrc?: string;
  imageRatio?: number;
  name: string;
  characterName: string;
  onImageLoaded?: () => void;
};

const CastCard: React.FC<CastCardProps> = (props: CastCardProps) => {
  const {
    cardWidth,
    src,
    placeholderSrc = ProfileIconRUL,
    imageRatio = 1.2,
    name,
    characterName,
    onImageLoaded,
    ...rest
  } = props;

  const classes = makeStyles(style)({
    width: cardWidth,
  });

  return (
    <Card {...rest} className={classes.root} raised>
      {/* <CardMedia
        width={imageWidth}
        height={imageHeight}
        component="img"
        src={imageSrc ? imageSrc : imagePlacehoder}
      /> */}
      <PosterImage
        src={src ? src : ProfileIconRUL}
        placeholderSrc={placeholderSrc}
        aspectRatio={imageRatio}
        elevation={0}
        hoverCursor="auto"
        fixedWidth={cardWidth}
        onImageLoaded={onImageLoaded}
      />
      <CardContent>
        <Typography variant="body1" noWrap>
          {name}
        </Typography>
        <Typography variant="subtitle2" noWrap>
          {characterName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CastCard;
