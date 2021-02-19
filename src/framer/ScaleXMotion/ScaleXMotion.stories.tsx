import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React from "react";
import ScaleXMotion from "./ScaleXMotion";

export default {
  title: "Scale X Motion",
};

export const Default = ()=>{
    const [show, setShow] = React.useState<boolean>(true);
    return (
        <React.Fragment>
            <button onClick={()=>setShow(state=>!state)}>toggle</button>
            <AnimateSharedLayout>
                <AnimatePresence exitBeforeEnter>
                    {show?
                        <Typography variant='h4' component='div'>
                            <Box fontSize='8rem'>
                                <ScaleXMotion key='scaleX'>This is text</ScaleXMotion>
                            </Box>
                        </Typography>
                        :null
                    }
                </AnimatePresence>
            </AnimateSharedLayout>
        </React.Fragment>
    )
}