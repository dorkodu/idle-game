import { createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

export const theme = createTheme({
  primaryColor: "green",
  defaultRadius: "md",
  cursorType: "pointer",
});

export const vars = themeToVars(theme);