import { NextApiRequest, NextApiResponse } from "next/types/index";

type reqHandlerResponseType =
  | { [key: string]: any }
  | [{ [key: string]: any }]
  | any;

/**
 * A handler for handing next api request
 *
 * @param req request object
 * @param res response object
 * @param reqHandler provide a request handler to handle request
 *
 * handler must return a resolved object
 *
 * @param errorHandler give a error handler if you want to handle error by your self
 *
 * otherwise default handler is used
 */
export default async function nextRequestHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  reqHandler: <T extends reqHandlerResponseType>(
    req: NextApiRequest
  ) => Promise<T>,
  errorHandler: (error: any, res: NextApiResponse) => void = null
) {
  try {
    const data = await reqHandler(req);
    res.status(200).json(data);

    return Promise.resolve();
  } catch (error) {
    if (errorHandler) {
      errorHandler(error, res);
    } else {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        res.status(error.request.status).json(error.request.data);
      } else {
        res.status(500).json({ message: error.message });
      }
    }

    return Promise.reject(error);
  }
}
