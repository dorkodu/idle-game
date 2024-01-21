import { globalStyle } from "@vanilla-extract/css";

globalStyle("body", {
  overscrollBehavior: "contain",

  backgroundImage: `url(/wavey-fingerprint.svg)`,
  backgroundAttachment: "fixed",
});

globalStyle("#root", {
  height: "100%",
});