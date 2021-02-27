import { LinearProgress, useTheme } from "@material-ui/core";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import CommonNavigation from "../../../../components/concrete/CommonNavigation/CommonNavigation";
import { useMovieVideos } from "../../../../effects/apiFetch/movieVideos";
import PageLayout from "../../../../layouts/pageLayout";

const GridVideos = dynamic(
  () => import("../../../../components/concrete/GridVideos/GridVideos"),
  {ssr:false}
);

const SectionHeader = dynamic(
  () => import("../../../../components/concrete/SectionHeader/SectionHeader"),
  {ssr:false}
);

const PhantomText = dynamic(
  () => import("../../../../components/concrete/PhantomText/PhantomText"),
  {ssr:false}
);

const VideosPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useMovieVideos(id as string);

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
                text="Videos"
                charDelayDefs={{
                  0: { enter: 1, exit: 0 },
                  1: { enter: 1.2, exit: 0 },
                  2: { enter: 1.4, exit: 0 },
                  3: { enter: 1.6, exit: 0 },
                  4: { enter: 1.8, exit: 0 },
                  5: { enter: 2, exit: 0 },
                }}
              />
            }
          />
          <GridVideos videoData={data} />
        </React.Fragment>
      )}
    </PageLayout>
  );
};

export default VideosPage;
