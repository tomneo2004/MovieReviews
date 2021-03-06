import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import { IVideoData } from "../../../utils/api/model/apiModelTypes";
import { getVideoURL } from "../../../utils/api/video/videoHelper";
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
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        flexWrap="nowrap"
        overflow="scroll"
      >
        {trailersData.map((trailer) => {
          const videoURL = getVideoURL(trailer.key, trailer.site);
          return (
            <Box key={trailer.id} m={2} position="relative">
              <VideoPlayer videoSrc={videoURL} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default VideoCollection;
