import { styled } from "../../stitches.config";

export const Container = styled("div", {
  margin: "auto",
  padding: 20,
  variants: {
    size: {
      sm: {
        maxWidth: 640,
      },
      md: {
        maxWidth: 768,
      },
      lg: {
        maxWidth: 1024,
      },
      xl: {
        maxWidth: 1280,
      },
    },
  },
});
