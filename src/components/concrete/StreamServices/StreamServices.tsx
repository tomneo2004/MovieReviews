import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import LinkTo from "../LinkTo/LinkTo";
import React from "react";
import {
  IStreamProvidersData,
  IStreamServiceData,
} from "../../../utils/api/model/apiModelTypes";
import {
  getLogoImageQuery,
  LogoSize,
} from "../../../utils/api/query/apiQueryBuilder";

type StreamServicesProps = React.ComponentProps<typeof Box> & {
  provider?: IStreamProvidersData;
  countryName?: string;
};

const renderServiceList = (services: IStreamServiceData[], title: string) => {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <Typography variant="h6">{title}</Typography>
      <Box display="flex" flexWrap="wrap">
        {services.map((s) => {
          return (
            <img
              style={{ marginRight: "5px", marginBottom: "5px" }}
              key={s.logo_path}
              src={getLogoImageQuery(s.logo_path, LogoSize.w45)}
              width={45}
              height={45}
            />
          );
        })}
      </Box>
    </React.Fragment>
  );
};

const StreamServices: React.FC<StreamServicesProps> = (
  props: StreamServicesProps
) => {
  const { provider, countryName, ...rest } = props;

  console.log(provider);

  if (!provider) {
    return (
      <Box display="flex" justifyContent="center">
        <Typography variant="h4" align="center">
          We could not find any stream services in {countryName}
        </Typography>
      </Box>
    );
  }

  return (
    <Box {...rest}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" align="center">
          Following streaming services are avaliable in {countryName}
        </Typography>
        <Typography variant="h5">
          Visit {<LinkTo display="inline" text="here" linkTo={provider.link} />}{" "}
          to watch
        </Typography>
        <Box display="flex" flexWrap="wrap">
          <Box display="flex" flexDirection="column" p={2}>
            {renderServiceList(provider.rent, "Stream")}
          </Box>
          <Box display="flex" flexDirection="column" p={2}>
            {renderServiceList(provider.rent, "Rent")}
          </Box>
          <Box display="flex" flexDirection="column" p={2}>
            {renderServiceList(provider.buy, "Buy")}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StreamServices;
