import Box from "@material-ui/core/Box/Box";
import Grid, { GridSpacing } from "@material-ui/core/Grid/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import style from "./HorizontalScrollStyle";
import React from "react";

export interface HScrollChildProp {
  id: string | number;
  element: React.ReactElement;
}

export type HorizontalScrollProps = React.ComponentProps<typeof Box> & {
  /** A function that take no arguments and return an array of object
   * which has properties of id and element which is ReactElement
   */
  children: () => HScrollChildProp[];
  /** Space between items
   *
   * number from 0 ~ 10
   *
   * default 2
   */
  space?: GridSpacing;
  /** Width of horizontal scroll content
   *
   * give null to make content flexible
   *
   * default null
   */
  width?: number | null;
  onScrollStateChange?: (state: IHorizontalScrollState) => void;
};

export interface IHorizontalScrollState {
  endLeft: boolean;
  endRight: boolean;
}

const isSameState = (
  oldState: IHorizontalScrollState,
  newState: IHorizontalScrollState
) => {
  return (
    oldState.endLeft === newState.endLeft &&
    oldState.endRight === newState.endRight
  );
};

/**
 * Component HorizontalScroll
 *
 * Display a set of items horizontally and become scrollable when overflow
 *
 * Listen for scroll state change
 *
 * return null if children given null
 *
 * Note: this component is not ideal for rendering
 * large amount of items, in order to render large amount
 * of items use `HorizontalGrid` instead
 *
 * @param {HorizontalScrollProps} props
 */
const HorizontalScroll: React.FC<HorizontalScrollProps> = (
  props: HorizontalScrollProps
) => {
  const {
    children,
    space = 2,
    width = null,
    onScrollStateChange,
    ...rest
  } = props;

  const classes = makeStyles(style)();

  const childNodes = React.useMemo(() => children(), [children]);

  if (!childNodes) return null;

  const gridRef = React.useRef(null);
  const [scrollState, setScrollState] = React.useState<IHorizontalScrollState>({
    endLeft: false,
    endRight: false,
  });

  const scrollHandler = () => {
    const contentWidth = gridRef.current.scrollWidth;
    const outerWidth = gridRef.current.clientWidth;
    const scrollLeft = gridRef.current.scrollLeft;

    let newState = { endLeft: false, endRight: false };
    if (contentWidth <= outerWidth) {
      //left end and right end
      newState = { endLeft: true, endRight: true };
    } else {
      if (contentWidth - outerWidth === scrollLeft) {
        //right end
        newState = { endLeft: false, endRight: true };
      } else if (scrollLeft === 0) {
        //left end
        newState = { endLeft: true, endRight: false };
      } else {
        //in middle of scroll
        newState = { endLeft: false, endRight: false };
      }
    }

    setScrollState((oldState) => {
      if (!isSameState(oldState, newState)) {
        return newState;
      }
      return oldState;
    });
  };

  React.useEffect(() => {
    scrollHandler();
  }, []);

  React.useEffect(() => {
    gridRef.current.addEventListener("scroll", scrollHandler);

    return () => {
      gridRef.current.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  React.useEffect(() => {
    if (onScrollStateChange) onScrollStateChange(scrollState);
  }, [scrollState]);

  const boxProps = {
    width: width ? `${width}px` : "auto",
  };

  return (
    <Box {...rest} {...boxProps}>
      <Grid
        ref={gridRef}
        className={classes.grid}
        container
        spacing={space}
        wrap="nowrap"
      >
        {childNodes.map((node) => {
          return (
            <Grid id="item" key={node.id} item>
              {node.element}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HorizontalScroll;
