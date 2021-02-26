import { useTheme } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useRouter } from "next/router";
import React from "react";
import CommonNavigation from "../../../../components/concrete/CommonNavigation/CommonNavigation";
import GridPosters from "../../../../components/concrete/GridPosters/GridPosters";
import MotionGallery from "../../../../components/concrete/MotionGallery/MotionGallery";
import PhantomText from "../../../../components/concrete/PhantomText/PhantomText";
import SectionHeader from "../../../../components/concrete/SectionHeader/SectionHeader";
import { useMoviePosters } from "../../../../effects/apiFetch/moviePosters";
import PageLayout from "../../../../layouts/pageLayout";
import {
  getPosterImageQuery,
  PosterSize,
} from "../../../../utils/api/query/apiQueryBuilder";

const PostersPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useMoviePosters(id as string);
  const [galleryState, setGalleryState] = React.useState<{
    open: boolean;
    index: number;
  }>({ open: false, index: 0 });
  const imageURLs = React.useMemo<string[]>(() => {
    if (!data) return [];
    let urls = [];
    for (let i = 0; i < data.length; i++) {
      const poster = data[i];
      urls.push(getPosterImageQuery(poster.file_path, PosterSize.original));
    }
    return urls;
  }, [data]);

  const openGallery = (index: number) => {
    setGalleryState((state) => {
      return {
        open: !state.open,
        index,
      };
    });
  };

  const closeGallery = () => {
    setGalleryState((state) => {
      return {
        open: !state.open,
        index: 0,
      };
    });
  };

  return (
    <PageLayout navigation={<CommonNavigation />}>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <React.Fragment>
          <SectionHeader
            mt={2}
            mx={2}
            headerAlign="center"
            bgcolor={theme.palette.primary.main}
            header={
              <PhantomText
                height="100%"
                bgcolor={theme.palette.primary.light}
                px={1}
                text="Posters"
                charDelayDefs={{
                  0: { enter: 1, exit: 0 },
                  1: { enter: 1.2, exit: 0 },
                  2: { enter: 1.4, exit: 0 },
                  3: { enter: 1.6, exit: 0 },
                  4: { enter: 1.8, exit: 0 },
                  5: { enter: 2, exit: 0 },
                  6: { enter: 2.2, exit: 0 },
                }}
              />
            }
          />
          <GridPosters posterData={data} onPosterClick={openGallery} />
          <MotionGallery
            open={galleryState.open}
            onClose={closeGallery}
            defaultIndex={galleryState.index}
            images={imageURLs}
          />
        </React.Fragment>
      )}
    </PageLayout>
  );
};

export default PostersPage;
