import Box from '@material-ui/core/Box';
import React from 'react';
import Grid, {GridCellProps} from 'react-virtualized/dist/es/Grid';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import CellMeasurer, {CellMeasurerCache} from 'react-virtualized/dist/es/CellMeasurer';

type ChildrenProps = {
    /**
     * index of item to be rendered
     */
    index:number,
    
    /**
     * Perform the cell measurements
     */
    measure:() => void, 
}

type ChildrenFunc = (props:ChildrenProps)=>React.ReactNode;

type HorizontalGridProps = React.ComponentProps<typeof Box> & {
    children: ChildrenFunc;
    itemCount: number;
    itemWidth: number;
    itemHeight?: number;
}

const cellRenderer = (gridCellProps:GridCellProps, func:ChildrenFunc, cache:CellMeasurerCache) => {
    const {
        columnIndex,
        key,
        parent,
        rowIndex,
        style
    } = gridCellProps;

    return (
        <CellMeasurer
        cache={cache}
        columnIndex={columnIndex}
        rowIndex={rowIndex}
        key={key}
        parent={parent}
        style={style}
        >
        {({ measure, registerChild})=>(
            <div key={key} style={{...style, textAlign:'center'}} ref={registerChild}>
            {func({index:columnIndex, measure})}
            </div>
        )}
        </CellMeasurer>
    )
}

/**
 * Component HorizontalGrid
 * 
 * You must specify height for component if parent component height is unknow
 * 
 * Component default width is 100% to it's parent unless you specify
 * 
 * Component default height is 100% to it's parent unless you specify
 * 
 * You must give item width
 * 
 * Item height is auto calculated, unless you specify
 * 
 * @param {HorizontalGridProps} props 
 */
const HorizontalGrid:React.FC<HorizontalGridProps> = (props:HorizontalGridProps) => {
    const {
        children,
        itemCount,
        itemWidth,
        itemHeight,
        width = '100%', 
        height = '100%',
        ...rest
    } = props;

    const cache = React.useMemo(()=>{
        return new CellMeasurerCache({
            defaultWidth: itemWidth,
            defaultHeight: itemHeight?itemHeight:0,
            fixedWidth: true,
            fixedHeight: itemHeight?true:false,
        })
    }, [itemWidth])

    return (
        <Box width={width} height={height} {...rest}>
            <AutoSizer>
            {({width, height})=>(
                <Grid
                rowCount={1} 
                columnCount={itemCount}
                width={width}
                height={height}
                columnWidth={cache.columnWidth}
                rowHeight={cache.rowHeight}
                cellRenderer={(props)=>cellRenderer(props, children, cache)}
                />
            )}
            </AutoSizer>
        </Box>
    );
};

export default HorizontalGrid;