import { NextApiRequest, NextApiResponse } from "next/types/index";
import axios from "axios";
import nextRequestHandler from "../../../../../utils/api/nextReqHandler/nextReqHandler";
import { getMovieImagesQuery } from "../../../../../utils/api/query/apiQueryBuilder";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await nextRequestHandler(req, res, async (req) => {
    const { language, page, region } = req.query as { [key: string]: string };
    const { id } = req.query as { [key: string]: string };
    const buildQuery = getMovieImagesQuery(id, { language, page, region });
    console.log("request:", buildQuery);
    const resp = await axios.get(buildQuery);
    return resp.data.posters;
  });
}
