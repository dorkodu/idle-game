import { globalStyle } from "@vanilla-extract/css";

globalStyle("body", {
  overscrollBehavior: "contain",
});

globalStyle("#root", {
  height: "100%",
});