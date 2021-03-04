import { NextApiRequest, NextApiResponse } from "next/types/index";
import { getDiscoverMoviesQuery } from "../../../../utils/api/query/apiQueryBuilder";
import axios from "axios";
import nextRequestHandler from "../../../../utils/api/nextReqHandler/nextReqHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await nextRequestHandler(req, res, async (req) => {
    const { language, page, region } = req.query as { [key: string]: string };
    const { genreId } = req.query as { [key: string]: string };
    const query = getDiscoverMoviesQuery(genreId, {
      language,
      page,
      region,
    });
    console.log("request:", query);
    const resp = await axios.get(query);
    return resp.data;
  });
}
