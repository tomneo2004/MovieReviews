import React from 'react';
import Card, {CardProps} from '@material-ui/core/Card';
import CardHeader,{}  from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMore from '@material-ui/icons/ExpandMoreSharp';
import Collapse from '@material-ui/core/Collapse';
import { Box, Chip, makeStyles, useTheme } from '@material-ui/core';
import style from './reviewCardStyle';
import clsx from 'clsx';
import { Rating } from '@material-ui/lab';

export interface IProps extends CardProps{
    authorName: string;
    createdAt: string | React.ReactElement;
    /**
     * full paragraph
     */
    paragraph: string | React.ReactElement;
    /**
     * partial paragraph
     */
    partial: string | React.ReactElement;
    expandable: boolean;
    rating: number;
    ratingMax: number;
}

const ReviewCard = (props:IProps)=>{
    const {
        authorName,
        createdAt,
        paragraph,
        partial,
        expandable,
        rating,
        ratingMax,
    } = props;

    const [expanded, setExpanded] = React.useState(false);
    const theme = useTheme();

    const handleExpand = ()=>{
        setExpanded(!expanded);
    }

    const classes = makeStyles(style)(theme);
    const expandBtnClass = {
        [classes.expand]: !expanded,
        [classes.expandOpen]: expanded,
    }

    return (
        <Card raised>
            <CardHeader 
            title={
            <Box display='flex' flexDirection='row' flexWrap='wrap'>
                <Typography component='div'>
                    <Box pr={1} fontWeight='800'>
                        {`Written by ${authorName}`}
                    </Box>
                </Typography>
                <Box pr={1}>
                    <Rating value={rating} max={ratingMax} precision={0.5} readOnly />
                </Box>
                <Chip label={`${rating}/${ratingMax}`} />
            </Box>
            }
            subheader={createdAt}
            />
            <CardContent>
            {
                !expanded?
                <Typography>
                    {partial}
                </Typography>
                :
                null
            }
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                        <Typography component='div'>
                            <Box>{paragraph}</Box>
                        </Typography>
                </Collapse>
            </CardContent>
            {
                expandable?
                <CardActions>
                    <IconButton
                    className={clsx(expandBtnClass)} 
                    onClick={handleExpand}>
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