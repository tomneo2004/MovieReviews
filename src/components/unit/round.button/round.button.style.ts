import createStyles from "@material-ui/core/styles/createStyles";
import {IProps} from './round.button.comp';

export default createStyles({
    root:(props:IProps)=>({
        borderRadius: props.cornerRadius
    })
})