import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { IVideoData } from "../../../utils/api/model/apiModelTypes";
import { getVideoURL } from "../../../utils/api/video/videoHelper";
import HScroll from "../../unit/HorizontalScroll/HorizontalScroll";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

type VideoCollectionProps = React.ComponentProps<typeof Box> & {
  trailersData: IVideoData[];
  // onTrailerClick?:(videoURL:string)=>void;
};

const VideoCollection: React.FC<VideoCollectionProps> = (
  props: VideoCollectionProps
) => {
  const { trailersData, ...rest } = props;

  if (!trailersData) return null;

  if (!trailersData.length) {
    return (
      <Typography variant="h4" component="div">
        <Box
          display="flex"
          justifyContent="center"
        >{`We could not find any videos`}</Box>
      </Typography>
    );
  }

  return (
    <Box {...rest}>
      <HScroll>
        {() => {
          return trailersData.map((trailer) => {
            const videoURL = getVideoURL(trailer.key, trailer.site);
            return {
              id: trailer.id,
              element: <VideoPlayer videoSrc={videoURL} />,
            };
          });
        }}
      </HScroll>
    </Box>
  );
};

export default VideoCollection;
