import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Box from '@material-ui/core/Box';

export interface IProps {
    brand?: React.ReactNode;
}
const Navigation = (props:IProps) => {
    const {
        brand = null,
    } = props;
    return (
        <AppBar>
            <Toolbar>
                {brand?<Box>{brand}</Box>:null}
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;