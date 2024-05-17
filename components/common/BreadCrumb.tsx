import React from "react";

type Props = {
  section: string;
};

const BreadCrumb = ({ section }: Props) => {
  return <div className="py-2">{`Home > ${section}`}</div>;
};

export default BreadCrumb;
