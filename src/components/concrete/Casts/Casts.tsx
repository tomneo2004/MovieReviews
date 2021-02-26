import Box from "@material-ui/core/Box";
import dynamic from "next/dynamic";
import React from "react";
import { ICastData } from "../../../utils/api/model/apiModelTypes";

const CastCollection = dynamic(
  () => import("../CastCollection/CastCollection")
);

type CastsProps = React.ComponentProps<typeof Box> & {
  casts?: ICastData[];
};
const Casts: React.FC<CastsProps> = (props: CastsProps) => {
  const { casts, ...rest } = props;

  return (
    <Box {...rest} pt={2}>
      {casts ? (
        <CastCollection castData={casts} />
      ) : (
        <CastCollection castData={null} />
      )}
    </Box>
  );
};

export default Casts;
