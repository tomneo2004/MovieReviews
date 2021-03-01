import Box from '@material-ui/core/Box';
import React from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import CellMeasurer, { CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer';
import List, { ListRowProps } from 'react-virtualized/dist/commonjs/List';

type ChildrenProps = {
    /**
     * index of item to be rendered
     */
    index:number,
    isVisible:boolean,
    isScrolling:boolean,
    /**
     * Perform the cell measurements
     */
    measure:() => void, 
    style:React.CSSProperties,
}

type ChildrenFunc = (props:ChildrenProps)=>React.ReactNode;

type VerticalListProps = React.ComponentProps<typeof Box> & {
    children: ChildrenFunc;
    itemCount: number;
    itemHeight?: number;
    itemWidth?: number;
}

const rowRenderer = (listRowProps:ListRowProps, func:ChildrenFunc, cache:CellMeasurerCache) => {
    const {
        index,
        key,
        parent,
        isScrolling,
        isVisible,
        style
    } = listRowProps;

    return (
        <CellMeasurer
        cache={cache}
        columnIndex={0}
        rowIndex={index}
        key={key}
        parent={parent}
        style={style}
        >
        {({ measure, registerChild})=>(
            <div key={key} style={{...style}} ref={registerChild}>
            {func({index, isVisible, isScrolling, measure, style})}
            </div>
        )}
        </CellMeasurer>
    )
}

const VerticalList:React.FC<VerticalListProps> = (props:VerticalListProps) => {
    const {
        children,
        itemCount,
        itemHeight,
        itemWidth,
        width='100%',
        height='100%',
        ...rest
    } = props;

    const cache = React.useMemo(()=>{
        return new CellMeasurerCache({
            defaultWidth: itemWidth?itemWidth:200,
            defaultHeight: itemHeight?itemHeight:200,
            fixedWidth: true,
            fixedHeight: itemHeight?true:false,
        })
    }, [itemWidth])
    
    return (
        <Box width={width} height={height} {...rest}>
            <AutoSizer defaultWidth={200} defaultHeight={200}>
            {({width, height})=>(
                <List
                width={width}
                height={height}
                rowCount={itemCount} 
                rowHeight={cache.rowHeight}
                rowRenderer={(props)=>rowRenderer(props, children, cache)}
                />
            )}
            </AutoSizer>
        </Box>
    );
};

export default VerticalList;