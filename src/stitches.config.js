import { createStitches } from "@stitches/react";

export const { styled, theme, createTheme } = createStitches({
  theme: {
    colors: {
      primaryBg: "#f5f6fa",
      lightPrimary: "#1d3597",
      textLight: "#2f3542",
      btnPrimary: "#46cc63",
    },
  },

  utils: {
    marginX: (value) => ({ marginLeft: value, marginRight: value }),
    marginY: (value) => ({ marginTop: value, marginBottom: value }),
    paddingX: (value) => ({ paddingLeft: value, paddingRight: value }),
    paddingY: (value) => ({ paddingTop: value, paddingBottom: value }),
  },

  media: {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 12804px)",
    xxl: "(min-width: 1540px)",
  },
});
