import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import useIsomorphicEffect from "../../../effects/isomorphic/isomorphicEffect";

type NavigationProps = React.ComponentProps<typeof AppBar> & {
  brand?: React.ReactElement;
  middleButtons?: React.ReactElement[];
  rightButtons?: React.ReactElement[];
  elevateThreshold?: number;
};

const renderButtons = (buttons: React.ReactNode[]) => {
  if (!buttons) return null;
  return buttons.map((btn, i) => {
    return (
      <Box key={i} px={1}>
        {btn}
      </Box>
    );
  });
};

/**
 * Component Navigation
 * 
 * Wrapped Material-UI AppBar
 * 
 * Component include brand on left and buttons on right
 * 
 * @param {NavigationProps} props 
 */
const Navigation: React.FC<NavigationProps> = (props: NavigationProps) => {
  const { 
    brand = null, 
    middleButtons = null,
    rightButtons = null, 
    elevation = 4,
    elevateThreshold = 0,
    ...rest 
  } = props;

  const appbarRef = React.useRef<HTMLDivElement>();
  const [elevate, setElevate] = React.useState<boolean>(false);
  const [boundaryY, setBoundaryY] = React.useState<number>(0);

  useIsomorphicEffect(()=>{
    const top = appbarRef.current.getBoundingClientRect().top;
    setBoundaryY(top+elevateThreshold);
  }, []);

  React.useEffect(()=>{

    const handleWindowScroll = ()=>{
      if(window.scrollY>boundaryY){
        setElevate(true);
      }
      else{
        setElevate(false);
      }
    }

    if(window){
      window.addEventListener('scroll', handleWindowScroll);
    }

    return ()=>{
      if(window){
         window.removeEventListener('scroll', handleWindowScroll);
      }
    }
  }, [boundaryY])

  return (
    <AppBar ref={appbarRef} {...rest} elevation={elevate?elevation:0}>
      <Toolbar>
        <Box flex="1">{brand ? brand : null}</Box>
        <Box flex="1" display="flex" justifyContent="center">
          {renderButtons(middleButtons)}
        </Box>
        <Box flex="1" display="flex" justifyContent="flex-end">
          {renderButtons(rightButtons)}
        </Box>
      </Toolbar>
    </AppBar>
  )
};

export default Navigation;
