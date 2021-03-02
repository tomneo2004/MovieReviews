import makeStyles from "@material-ui/core/styles/makeStyles";
import Button, { ButtonProps } from "@material-ui/core/Button/Button";
import React from "react";
import style from "./RoundButtonStyle";

type RoundButtonProps = ButtonProps & {
  /**
   * corner radius for button
   */
  cornerRadius?: string | number;
};
/**
 * Component RoundButton
 *
 * @param {RoundButtonProps} props
 */
const RoundButton: React.FC<RoundButtonProps> = (props: RoundButtonProps) => {
  const { children, cornerRadius = "4px", ...rest } = props;

  const classes = makeStyles(style)({ cornerRadius });

  return (
    <Button className={classes.root} {...rest}>
      {children}
    </Button>
  );
};

export default RoundButton;
