import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  Fab,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import ReactPlayer from "react-player";
import { useNoembed } from "../../../effects/apiFetch/noembed";
import style from "./VideoPlayerStyle";
import CloseIcon from '@material-ui/icons/CloseSharp';

type VideoPlayerProps = React.ComponentProps<typeof Card> & {
  videoSrc: string;
  videoTitle?: string;
  onOpen?: () => void;
  onClose?: () => void;
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
  const { videoSrc, videoTitle, onOpen, onClose, ...rest } = props;
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState<boolean>(false);
  const { data, error } = useNoembed(videoSrc);
  const [thumbReady, setThumbReady] = React.useState<boolean>(false);
  const classes = makeStyles(style)({
    compact,
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

  const handleVideoClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  if (!thumbReady || error || !data) return renderSkeletons();

  return (
    <React.Fragment>
      {/* thumbnail */}
      <Box>
        <Card {...rest} onClick={handleVideoClick}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              src={data.thumbnail_url}
              component="img"
            />
          </CardActionArea>
        </Card>
        <Typography variant="subtitle2" component="div">
          <Box>{videoTitle}</Box>
        </Typography>
      </Box>

      {/* video player */}
      <Dialog
        classes={{ paper: classes.paper }}
        fullScreen={compact?true:false}
        fullWidth
        maxWidth='lg'
        open={open}
        onClose={handleVideoClose}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={compact?0:1}
          height="100%"
        >
          <Fab classes={{root:classes.fab}} size='small' color='primary'
          onClick={handleVideoClose}
          >
            <CloseIcon />
          </Fab>
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
