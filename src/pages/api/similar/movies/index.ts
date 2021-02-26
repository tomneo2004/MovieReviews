import { NextApiRequest, NextApiResponse } from "next";
import { getSimilarMoviesQuery} from '../../../../utils/api/query/apiQueryBuilder';
import axios from "axios";
import nextRequestHandler from "../../../../utils/api/nextReqHandler/nextReqHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await nextRequestHandler(req, res, async (req) => {
    const { language, page, region } = req.query as { [key: string]: string };
    const { id } = req.query as { [key: string]: string };
    const query = getSimilarMoviesQuery(id, { language, page, region });
    console.log("request:", query);
    const resp = await axios.get(query);
    return resp.data;
  });
}
