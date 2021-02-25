import {makeStyles, Modal, useTheme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import React from "react";
import style from "./PosterImageStyle";

import imagePlacehoder from "../../../assets/placeholder/poster.svg";
import { motion } from "framer-motion";
import { springTransition } from "../../../framer/Transition";
import ImageContainer from "../../unit/ImageContainer/ImageContainer";

type PosterImageProps = React.ComponentProps<typeof Card> & {
  alt?: string;

  /**
   * Image width at sm size and below
   */
  smDown?:number;

  /**
   * Image width at sm size up
   */
  smUp?:number;

  /**
   * Image width at md size and up
   */
  mdUp?:number;

  /**
   * Image width at lg size and up
   */
  lgUp?:number;

  /**
   * Image width at xl size and up
   */
  xlUp?:number;

  /**
   * Ratio between image width and height
   *
   * e.g width=150, aspectRatio=1.5, height=width * aspectRatio
   *
   * default is 1.5
   */
  aspectRatio?: number;

  /**
   * Image source URL
   */
  imageURL?: string;

  /**
   * Custom layoutId for AnimateSharedLayout
   *
   * https://www.framer.com/api/motion/animate-shared-layout/
   *
   * If PosterImage is in a collection among with other PosterImage
   * you nust give an unique layout id from the others otherwise behaviour
   * might be not expected
   *
   * default to null
   */
  layoutId?: string;

  hoverCursor?: string;

  enlargeEnabled?: boolean;

};

const renderCardMedia = (
  imageURL: string,
  // imageWidth: number,
  // aspectRatio: number,
  placeholder: string,
  cardMediaStyle: string,
  alt: string
) => {
  return (
    <CardMedia
      className={cardMediaStyle}
      component="img"
      alt={alt}
      // width={imageWidth}
      // height={imageWidth * aspectRatio}
      height='100%'
      src={imageURL ? imageURL : placeholder}
    />
  );
};


/**
 * Component PosterImage
 *
 * Display image with Material-UI Card
 *
 * Image can be enlarged when clicked
 *
 * @param {PosterImageProps} props
 */
const PosterImage: React.FC<PosterImageProps> = React.forwardRef(
  (props: PosterImageProps, _ref) => {
    const {
      alt = "image",
      imageURL = "",
      smDown = 300,
      smUp = 320,
      mdUp = 350,
      lgUp = 400,
      xlUp = 450,
      aspectRatio = 1.5,
      layoutId = null,
      hoverCursor = "auto",
      enlargeEnabled = false,
      onClick,
      ...rest
    } = props;
    const theme = useTheme();
    const [isEnlarge, setIsEnlarge] = React.useState<boolean>(false);
    const classes = makeStyles(style)({
      smDown,
      smUp,
      mdUp,
      lgUp,
      xlUp,
      theme,
      aspectRatio,
      cursor: hoverCursor,
    });

    const toggleEnlarge = () => setIsEnlarge((state) => !state);

    if (isEnlarge) {
      return (
        <Modal className={classes.modal} open={true} onClose={toggleEnlarge}>
          <ImageContainer
            width='100%'
            height='100%'
            display='flex'
            justifyContent='center'
            alignItems='center'
            src={imageURL}
            alt={alt}
            onClick={toggleEnlarge}
            postProcess={
              (node)=>(
                <motion.div layoutId={layoutId} layout
                transition={springTransition()}>
                  {node}
                </motion.div>
              )
            }
          />
        </Modal>
      );
    }

    return (
      <motion.div
        layoutId={layoutId}
        layout
        transition={springTransition()}
        style={{
          position:'relative',
          // width:'fit-content',
          // height:'fit-content'
          
        }}
      >
          <Card {...rest} classes={{root:classes.card}} onClick={enlargeEnabled?toggleEnlarge:onClick}>
            {renderCardMedia(
              imageURL,
              imagePlacehoder,
              classes.cardMedia,
              alt
            )}
          </Card>
        </motion.div>
    );
  }
);

export default PosterImage;
