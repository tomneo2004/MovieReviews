import {NextApiRequest, NextApiResponse} from 'next';
import {getMovieReviewQuery} from '../../../../../utils/api/query/apiQueryBuilder';
import axios from 'axios';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try{
        const {language ,page, region} = req.query as {[key:string]:string};
        const {id} = req.query as {[key:string]:string};
        const buildQuery =  getMovieReviewQuery(id, {language, page, region});
        console.log('request:', buildQuery);
        const resp = await axios.get(buildQuery);
        res.status(resp.status).json(resp.data);
    }
    catch(err){
        if(err.response){
            res.status(err.response.status).json(err.response.data);
        }
        else if(err.request){
            res.status(err.request.status).json(err.request.data);
        }
        else{
            res.status(500).json({message:err.message});
        }
    }

}