import Box from "@material-ui/core/Box";
import React from "react";
import { ICastData } from "../../../utils/api/model/apiModelTypes";
import CastCollection from "../CastCollection/CastCollection";
import config from '../../config';

type CastsProps = React.ComponentProps<typeof Box> & {
  casts?: ICastData[];
};
const Casts: React.FC<CastsProps> = (props: CastsProps) => {
  const { casts, ...rest } = props;

  return (
    <Box {...rest} pt={2}>
      {casts ? (
        <CastCollection 
        collectionHeight={config.Cast_Collection_Height} 
        itemWidth={config.Cast_Collection_Item_Width}
        castData={casts} />
      ) : (
        <CastCollection 
        collectionHeight={config.Cast_Collection_Height} 
        itemWidth={config.Cast_Collection_Item_Width}
         castData={null} />
      )}
    </Box>
  );
};

export default Casts;
