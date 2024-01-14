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

export const textShadow = style({
  textShadow: "-1px -1px 0 rgba(0, 0, 0, 1), 1px -1px 0 rgba(0, 0, 0, 1), -1px 1px 0 rgba(0, 0, 0, 1), 1px 1px 0 rgba(0, 0, 0, 1)",
});