import { Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";

type LinkToProps = React.ComponentProps<typeof Typography> & {
  text: string;
  linkTo: string;
};

const LinkTo: React.FC<LinkToProps> = (props: LinkToProps) => {
  const { text, linkTo, ...rest } = props;
  return (
    <Typography {...rest}>
      <Link href={linkTo}>
        <a>{text}</a>
      </Link>
    </Typography>
  );
};

export default LinkTo;
