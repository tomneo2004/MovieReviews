import createStyles from "@material-ui/core/styles/createStyles";
import {IProps} from './roundButton';

export default createStyles({
    root:(props:IProps)=>({
        borderRadius: props.cornerRadius
    })
})