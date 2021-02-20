import Box from '@material-ui/core/Box';
import React from 'react';
import { IVideoData } from '../../../utils/api/model/apiModelTypes';
import TrailerCollection from '../VideoCollection/VideoCollection';

type TrailersProps = React.ComponentProps<typeof Box> & {
    trailers?:IVideoData[];
}

const Trailers:React.FC<TrailersProps> = (props:TrailersProps) => {
    const {
        trailers,
        ...rest
    } = props;

    return (
        <Box {...rest} pt={2}>
            {trailers ? (
            <TrailerCollection trailersData={trailers} />
            ) : (
            <TrailerCollection trailersData={null} />
            )}
        </Box>
    );
};

export default Trailers;