import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {
  IMoviePosterData,
  IVideoData,
} from "../../../utils/api/model/apiModelTypes";
import LinkTo from "../LinkTo/LinkTo";
import PosterCollection from "../PosterCollection/PosterCollection";
import VideoCollection from "../VideoCollection/VideoCollection";

enum MediaTypes {
  "video" = "video",
  "poster" = "poster",
}

type DataMap = {
  [MediaTypes.video]: { data: IVideoData[]; link: string };
  [MediaTypes.poster]: { data: IMoviePosterData[]; link: string };
};

type SnippetMediaProps = React.ComponentProps<typeof Box> & {
  defaultTab?: MediaTypes;
  trailers: { snippetData: IVideoData[]; routeToPage: string };
  posters: { snippetData: IMoviePosterData[]; routeToPage: string };
};

const renderMedia = (media: MediaTypes, mediaData: DataMap) => {
  switch (media) {
    case MediaTypes.video:
      const videoData = mediaData[media].data as IVideoData[];
      const videoLink = mediaData[media].link as string;
      return (
        <React.Fragment>
          <Box pl={2}>
            <LinkTo text='See all videos' linkTo={videoLink} />
          </Box>
          <VideoCollection trailersData={videoData} />
        </React.Fragment>
      );
    case MediaTypes.poster:
      const posterData = mediaData[media].data as IMoviePosterData[];
      const posterLink = mediaData[media].link as string;
      return (
        <React.Fragment>
          <Box pl={2}>
            <LinkTo text='See all posters' linkTo={posterLink} />
          </Box>
          <PosterCollection posters={posterData} />
        </React.Fragment>
      );
    default:
      return (
        <Typography variant="h4" component="div">
          <Box>No media found</Box>
        </Typography>
      );
  }
};

const SnippetMedia: React.FC<SnippetMediaProps> = (props: SnippetMediaProps) => {
  const { defaultTab = MediaTypes.video, trailers, posters, ...rest } = props;

  const [value, setValue] = React.useState<MediaTypes>(defaultTab);

  const handleTabChange = (_evt: React.ChangeEvent<{}>, value: MediaTypes) => {
    setValue(value);
  };

  const mediaTypeToData = React.useMemo<DataMap>(() => {
    return {
      [MediaTypes.video]: {
        data: trailers.snippetData,
        link: trailers.routeToPage,
      },
      [MediaTypes.poster]: {
        data: posters.snippetData,
        link: posters.routeToPage,
      },
    };
  }, []);

  return (
    <Box {...rest}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab value={MediaTypes.video} label="Video" />
        <Tab value={MediaTypes.poster} label="Posters" />
      </Tabs>
      <Box pt={1}>{renderMedia(value, mediaTypeToData)}</Box>
    </Box>
  );
};

export default SnippetMedia;
