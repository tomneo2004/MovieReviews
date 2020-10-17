import { Box } from "@material-ui/core";

export interface IProps {
    children: React.ReactNode;
}

const MainLayout = (props:IProps) => {
    const {
        children,
    } = props;

    return (
        <Box>
            {children}
        </Box>
    );
};

export default MainLayout;