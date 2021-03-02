import { NextApiRequest, NextApiResponse } from "next/types/index";
import { getTrendingQuery } from "../../../../utils/api/query/apiQueryBuilder";
import axios from "axios";
import nextRequestHandler from "../../../../utils/api/nextReqHandler/nextReqHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await nextRequestHandler(req, res, async (req) => {
    const { language, page, region } = req.query as { [key: string]: string };
    const { mediaType, timeWindow } = req.query as { [key: string]: string };
    const query = getTrendingQuery(mediaType, timeWindow, {
      language,
      page,
      region,
    });
    console.log("request:", query);
    const resp = await axios.get(query);
    return resp.data;
  });
}
