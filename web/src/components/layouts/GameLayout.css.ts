import { vars } from "@/styles/theme";
import { em } from "@mantine/core";
import { style } from "@vanilla-extract/css";

export const header = style({
  backgroundColor: "#000",
  borderRadius: `0 0 ${vars.spacing.xs} ${vars.spacing.xs}`,
  zIndex: 1,
});

export const footer = style({
  backgroundColor: "#000",
  borderRadius: `${vars.spacing.xs} ${vars.spacing.xs} 0 0`,
  zIndex: 1,
});

export const glow = style({
  boxShadow: `0 0 2rem #bc13fe, 0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe`,
});

export const footerTopSection = style({
  flexDirection: "column",
  justifyContent: "space-between",

  '@media': {
    [`(min-width: ${em(480)})`]: {
      flexDirection: "row",
    },
  },
});