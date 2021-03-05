import Link from "next/link";
import React from "react";

type LinkToProps = React.ComponentProps<typeof React.Component> & {
  text: string;
  linkTo: string;
  shallow?: boolean;
  display?: "inline" | "block" | "initial";
};

const LinkTo: React.FC<LinkToProps> = (props: LinkToProps) => {
  const { text, linkTo, shallow = false, display = "inline" } = props;
  return (
    <Link href={linkTo} shallow={shallow}>
      <a style={{ display: display }}>{text}</a>
    </Link>
  );
};

export default LinkTo;
