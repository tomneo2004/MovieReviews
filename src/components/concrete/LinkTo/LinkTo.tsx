import { Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";

type LinkToProps = React.ComponentProps<typeof Typography> & {
  text: string;
  linkTo: string;
  shallow?: boolean;
};

const LinkTo: React.FC<LinkToProps> = (props: LinkToProps) => {
  const { text, linkTo, shallow = false, ...rest } = props;
  return (
    <Typography {...rest}>
      <Link href={linkTo} shallow={shallow}>
        <a>{text}</a>
      </Link>
    </Typography>
  );
};

export default LinkTo;
