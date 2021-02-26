import { Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import dynamic from "next/dynamic";
import React from "react";
import { ICastData } from "../../../utils/api/model/apiModelTypes";
import { buildImageQuery } from "../../../utils/api/query/apiQueryBuilder";
import HScroll, {
  HScrollChildProp,
} from "../../unit/HorizontalScroll/HorizontalScroll";

const CastPoster = dynamic(() => import("../CastPoster/CastPoster"));

type CastCollectionProps = React.ComponentProps<typeof Box> & {
  castData: ICastData[];
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
  const { castData, ...rest } = props;

  if (!castData) return renderSkeletons();

  return (
    <Box {...rest}>
      <HScroll>
        {() => {
          return castData.map((cast) => {
            const imgQuery = buildImageQuery(
              cast.profile_path,
              "w138_and_h175_face"
            );
            return {
              id: cast.cast_id,
              element: (
                <CastPoster
                  imageSrc={imgQuery}
                  name={cast.name}
                  characterName={cast.character}
                  imageWidth={138}
                  imageHeight={175}
                />
              ),
            };
          });
        }}
      </HScroll>
    </Box>
  );
};

export default CastCollection;
