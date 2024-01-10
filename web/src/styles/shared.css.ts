import { style } from "@vanilla-extract/css";

export const wrapText = style({
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});

export const truncate = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});