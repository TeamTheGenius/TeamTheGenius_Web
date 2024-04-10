import { Fragment } from "react";

export const breakLine = (content: string) =>
  content.split("\n").map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));
