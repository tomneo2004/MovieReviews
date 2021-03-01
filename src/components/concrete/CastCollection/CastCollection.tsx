import { Box, useTheme } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { ICastData } from "../../../utils/api/model/apiModelTypes";
import { buildImageQuery } from "../../../utils/api/query/apiQueryBuilder";
import HorizontalGrid from "../../unit/HorizontalGrid/HorizontalGrid";
import HScroll, {
  HScrollChildProp,
} from "../../unit/HorizontalScroll/HorizontalScroll";
import CastPoster from "../CastCard/CastCard";

type CastCollectionProps = React.ComponentProps<typeof Box> & {
  castData: ICastData[];
  collectionHeight:number;
  itemWidth:number;
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
  const { castData, collectionHeight, itemWidth,  ...rest } = props;
  const theme = useTheme();

  if (!castData) return renderSkeletons();

  return (
    <Box {...rest}>
       <HorizontalGrid 
        height={collectionHeight} 
        itemCount={castData.length}
        itemWidth={itemWidth}
        >
          {({index})=>{
            const data = castData[index];
            const imgQuery = buildImageQuery(
              data.profile_path,
              "w138_and_h175_face"
            );
            return (
              <Box width={itemWidth} p={2}>
                <CastPoster
                  src={imgQuery}
                  name={data.name}
                  characterName={data.character}
                  cardWidth={itemWidth -  2 * theme.spacing() * 2}
                />
              </Box>
            )
          }}
        </HorizontalGrid>
      {/* <HScroll>
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
      </HScroll> */}
    </Box>
  );
};

export default CastCollection;
