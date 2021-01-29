import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { ICastData } from '../../../utils/api/model/apiModelTypes';
import { buildImageQuery } from '../../../utils/api/query/apiQueryBuilder';
import HScroll, { HScrollChildProp } from '../../unit/horizontalScroll/hScroll';
import CastPoster from '../castPoster/castPoster';

interface IProps {
    castData:ICastData[];
}

const renderSkeletons = ()=>{
    const skeletons:HScrollChildProp[] = [];
    
    for(let i:number=0; i<4; i++){
        skeletons.push({
            id:i,
            element: (
                <React.Fragment>
                    <Skeleton variant='rect' width={138} height={175} />
                    <Skeleton variant='text' />
                    <Skeleton variant='text' />
                </React.Fragment>
            )
        })
    }

    return (
        <HScroll>
        {()=>skeletons}
        </HScroll>
    )
    
}

const CastCollection = (props:IProps) => {
    const {castData} = props;

    if(!castData) return renderSkeletons();
    
    return (
        <HScroll>
        {()=>{
            return castData.map(cast=>{
                const imgQuery = buildImageQuery(cast.profile_path, 'w138_and_h175_face')
                return ({
                    id:cast.cast_id,
                    element: (<CastPoster
                        imageSrc={imgQuery}
                        name={cast.name}
                        characterName={cast.character}
                        imageWidth={138}
                        imageHeight={175}
                        />)
                })
            })
        }}    
        </HScroll>
    )
        
};

export default CastCollection;