import React from 'react';
import Card, {CardProps} from '@material-ui/core/Card';
import CardHeader,{}  from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { partialSentenceFrom } from '../../../utils/sentenceExtractor';
import IconButton from '@material-ui/core/IconButton';
import ExpandMore from '@material-ui/icons/ExpandMoreSharp';

export interface IProps extends CardProps{
    authorName: string;
    createdAt: string | React.ReactElement;
    paragraph: string;
    /**
     * Number of sentences to be extracted from content
     * as parital content, default is 4
     */
    partialParagraph?: number;
}

const ReviewCard = (props:IProps)=>{
    const {
        authorName,
        createdAt,
        paragraph,
        partialParagraph = 4,
    } = props;

    let extracted = partialSentenceFrom(paragraph, partialParagraph);
    if(!extracted.fullyExtracted){
        extracted.partial = extracted.partial + ' ...';
    } 

    return (
        <Card>
            <CardHeader 
            title={authorName}
            subheader={createdAt}
            />
            <CardContent>
                <Typography>
                    {extracted.partial}
                </Typography>
            </CardContent>
            {
                !extracted.fullyExtracted?
                <CardActions>
                    <IconButton>
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                :
                null
            }
            
        </Card>
    );
}

export default ReviewCard;