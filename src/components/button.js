import Button from "@mui/material/Button";
import * as React from "react";

export default function MyButton({
  bg,
  hover,
  text,
  textcolor,
  texthover,
  ...rest
}) {
  const { handleClick, icon } = rest;
  return (
    <Button
      sx={{
        backgroundColor: bg,
        "&:hover": { backgroundColor: hover, color: texthover },
        textAlign: "center",
        color: textcolor,
      }}
      variant="contained"
      endIcon={icon}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}
