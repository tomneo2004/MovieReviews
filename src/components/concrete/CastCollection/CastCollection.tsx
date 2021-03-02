import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";
import React from "react";
import { ICastData } from "../../../utils/api/model/apiModelTypes";
import {
  getProfileImageQuery,
  ProfileSize,
} from "../../../utils/api/query/apiQueryBuilder";
import HorizontalGrid from "../../unit/HorizontalGrid/HorizontalGrid";
import HScroll, {
  HScrollChildProp,
} from "../../unit/HorizontalScroll/HorizontalScroll";
import CastPoster from "../CastCard/CastCard";
import MotionGallery from "../MotionGallery/MotionGallery";
import ProfileIconURL from "../../../assets/placeholder/profile.svg";

type CastCollectionProps = React.ComponentProps<typeof Box> & {
  castData: ICastData[];
  collectionHeight: number;
  itemWidth: number;
  imageRatio: number;
  profileSize: ProfileSize;
};

const renderSkeletons = () => {
  const skeletons: HScrollChildProp[] = [];

  for (let i: number = 0; i < 4; i++) {
    skeletons.push({
      id: i,
      element: (
        <React.Fragment>
          <Skeleton variant="rect" width={138} height={175} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </React.Fragment>
      ),
    });
  }

  return <HScroll id="loading-placeholder">{() => skeletons}</HScroll>;
};

const CastCollection: React.FC<CastCollectionProps> = (
  props: CastCollectionProps
) => {
  const {
    castData,
    collectionHeight,
    itemWidth,
    imageRatio,
    profileSize,
    ...rest
  } = props;
  const theme = useTheme();
  const imageURLs = React.useMemo<string[]>(() => {
    const urls: string[] = [];

    if (!castData) return urls;
    for (let i = 0; i < castData.length; i++) {
      const cast = castData[i];

      if (cast.profile_path) {
        urls.push(
          getProfileImageQuery(cast.profile_path, ProfileSize.original)
        );
      } else {
        urls.push(ProfileIconURL);
      }
    }
    return urls;
  }, [castData]);
  const imageInfos = React.useMemo<React.ReactNode[]>(() => {
    const infos: React.ReactNode[] = [];

    if (!castData) return infos;
    for (let i = 0; i < castData.length; i++) {
      const cast = castData[i];

      infos.push(
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={2}
          bgcolor="#fff"
          flexWrap="wrap"
        >
          <Typography variant="h5">{cast.name}</Typography>
          <Typography variant="h6">{cast.character}</Typography>
        </Box>
      );
    }
    return infos;
  }, [castData]);

  const [galleryState, setGalleryState] = React.useState<{
    open: boolean;
    index: number;
  }>({ open: false, index: 0 });

  if (!castData) return renderSkeletons();

  const openGallery = (index: number) => {
    setGalleryState({
      open: true,
      index: index,
    });
  };

  const closeGallery = () => {
    setGalleryState({
      open: false,
      index: 0,
    });
  };

  return (
    <Box {...rest}>
      <HorizontalGrid
        height={collectionHeight}
        itemCount={castData.length}
        itemWidth={itemWidth}
      >
        {({ index }) => {
          const data = castData[index];
          const imgQuery = getProfileImageQuery(data.profile_path, profileSize);
          return (
            <Box width={itemWidth} p={2}>
              <CastPoster
                src={imgQuery}
                name={data.name}
                characterName={data.character}
                cardWidth={itemWidth - 2 * theme.spacing() * 2}
                imageRatio={imageRatio}
                onClick={() => openGallery(index)}
                style={{ cursor: "pointer" }}
              />
            </Box>
          );
        }}
      </HorizontalGrid>
      <MotionGallery
        open={galleryState.open}
        onClose={closeGallery}
        defaultIndex={galleryState.index}
        images={imageURLs}
        imageInfos={imageInfos}
      />
    </Box>
  );
};

export default CastCollection;
