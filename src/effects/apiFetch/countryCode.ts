import React from "react";
import { IFetchResponse } from "./fetchResponse";
import axio from "axios";

type ICountryInfo = {
  countryCode: string;
  countryName: string;
};

/**
 * Side effect for fetching country code
 */
export function useCountryCode(): IFetchResponse<ICountryInfo> {
  const [error, setError] = React.useState<Error>(null);
  const [data, updateCountryCode] = React.useState<ICountryInfo>(null);

  React.useEffect(() => {
    axio("https://extreme-ip-lookup.com/json/", {
      headers: { "Cache-Control": "no-cache" },
    })
      .then((data) => {
        setError(null);
        updateCountryCode({
          countryCode: data.data.countryCode,
          countryName: data.data.country,
        });
      })
      .catch((e) => {
        setError(e);
        updateCountryCode(null);
      });
  }, []);

  if (!data && !error) {
    return {
      data: null,
      isLoading: true,
      error: null,
    };
  } else if (error) {
    return {
      data: null,
      isLoading: false,
      error: error,
    };
  } else {
    return {
      data,
      isLoading: false,
      error: null,
    };
  }
}
