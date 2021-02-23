import { NextApiRequest, NextApiResponse } from "next";
import { getSearchMovieQuery } from "../../../../utils/api/query/apiQueryBuilder";
import axios from "axios";
import nextRequestHandler from "../../../../utils/api/nextReqHandler/nextReqHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await nextRequestHandler(req, res, async (req) => {
    const { language, page, region } = req.query as { [key: string]: string };
    const { query } = req.query as { [key: string]: string };
    const buildQuery = getSearchMovieQuery(query, { language, page, region });
    console.log("request:", buildQuery);
    const resp = await axios.get(buildQuery);
    return resp.data;
  });
}
