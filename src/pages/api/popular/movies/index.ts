import {NextApiRequest, NextApiResponse} from 'next';
import {getPouplarMoviesQuery} from '../../../../utils/apiQueryBuilder';
import axios from 'axios';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try{
        const {language ,page, region} = req.query as {[key:string]:string};
        const query =  getPouplarMoviesQuery({language, page, region});
        console.log('request:', query);
        const resp = await axios.get(query);
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