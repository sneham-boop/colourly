import { useState } from "react";
import Add from "@mui/icons-material/AddCircleRounded";

export default function SelectedColor({ newColor, color, updatePalette, id }) {
  const handleClick = (e) => {
    updatePalette((prev) => {
      let oldColors = [...prev];
      oldColors[id] = newColor;
      return [...oldColors];
    });
  };

  return <Add onClick={handleClick} sx={{ color: `#${color}`, fontSize: 50 }} />;
}
