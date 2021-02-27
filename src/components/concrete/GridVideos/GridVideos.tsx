import { Box, Grid } from "@material-ui/core";
import React from "react";
import { IVideoData } from "../../../utils/api/model/apiModelTypes";
import { getVideoURL } from "../../../utils/api/video/videoHelper";
import VideoPlayer from "../VideoPlayer/VideoPlayer";


type GridVideosProps = React.ComponentProps<typeof Box> & {
  videoData: IVideoData[];
};

const GridVideos: React.FC<GridVideosProps> = (props: GridVideosProps) => {
  const { videoData, ...rest } = props;

  return (
    <Box {...rest}>
      <Grid container>
        {videoData.map((video) => {
          const videoURL = getVideoURL(video.key, video.site);
          return (
            <Grid key={video.id} item xs>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={2}
              >
                <VideoPlayer
                  widthAtSMDown={300}
                  widthAtSMUp={350}
                  widthAtMDUp={400}
                  widthAtLGUp={400}
                  widthAtXLUp={400}
                  videoSrc={videoURL}
                  videoTitle={video.name}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default React.memo(GridVideos, (pre, next) => {
  return pre.videoData === next.videoData;
});
