import { style } from "@vanilla-extract/css";

export const draggable = style({
  maxWidth: 360,
  height: "100%",
  maxHeight: 480,
});

export const handle = style({
  flex: 1,
  lineHeight: "32px",
  cursor: "grab",

  ":active": {
    cursor: "grabbing",
  }
});