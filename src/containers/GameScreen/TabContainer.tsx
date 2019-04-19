import { Typography } from "@material-ui/core";
import React, { FC } from "react";

interface Props {
  tabCount: number;
}

export const TabContainer: FC<Props> = (props) => {
  const { children, tabCount } = props;

  return (
    <Typography component="div" style={{ padding: 8 * tabCount }}>
      {children}
    </Typography>
  );
}