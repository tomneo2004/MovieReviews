import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  makeStyles,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import ReactPlayer from "react-player";
import { useNoembed } from "../../../effects/apiFetch/noembed";
import style from "./VideoPlayerStyle";

type VideoPlayerProps = React.ComponentProps<typeof Card> & {
  videoSrc: string;
  onOpen?: () => void;
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};

const renderSkeletons = () => {
  return (
    <Card>
      <Skeleton variant="rect" width="300px" height="350px" />
    </Card>
  );
};

let img: HTMLImageElement;

const VideoPlayer: React.FC<VideoPlayerProps> = (props: VideoPlayerProps) => {
  const { videoSrc, onOpen, onClose, ...rest } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const { data, error } = useNoembed(videoSrc);
  const [thumbReady, setThumbReady] = React.useState<boolean>(false);
  const classes = makeStyles(style)({
    thumbWidth: data ? data.thumbnail_width : 0,
    thumbHeight: data ? data.thumbnail_height : 0,
  });

  React.useEffect(() => {
    if (!data) {
      setThumbReady(false);
      return;
    }

    img = new Image();
    img.onload = () => {
      setThumbReady(true);
    };
    setThumbReady(false);
    img.src = data.thumbnail_url;

    return () => {
      if (img) img.onload = null;
    };
  }, [data]);

  const handleVideoClick = () => {
    setOpen(true);
    if (onOpen) onOpen();
  };

  const handleVideoClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    setOpen(false);
    if (onClose) onClose(event, reason);
  };

  if (!thumbReady || error || !data) return renderSkeletons();

  return (
    <React.Fragment>
      <Card {...rest} onClick={handleVideoClick}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            src={data.thumbnail_url}
            component="img"
          />
        </CardActionArea>
      </Card>
      <Dialog
        classes={{ paper: classes.paper }}
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleVideoClose}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={1}
          height="100%"
        >
          <ReactPlayer
            url={videoSrc}
            width="100%"
            height="100%"
            controls
            playing={open}
          />
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default VideoPlayer;
