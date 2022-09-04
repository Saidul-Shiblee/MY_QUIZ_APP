import Fab from "@mui/material/Fab";
import * as React from "react";

export default function ActionButton({
  children,
  color,
  textcolor,
  position,
  margin,
}) {
  return (
    <Fab
      sx={{
        background: color,
        color: textcolor,
        // position: position,
        // right: margin.right,
        // top: margin.top,
        "&:hover": { color: color, background: textcolor },
      }}
    >
      {children}
    </Fab>
  );
}
