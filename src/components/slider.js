import Slider from "@mui/material/Slider";
import * as React from "react";

export default function MySlider({ step }) {
  return (
    <Slider
      sx={{ width: "75%", mx: "5px" }}
      value={step}
      valueLabelDisplay="auto"
    />
  );
}
