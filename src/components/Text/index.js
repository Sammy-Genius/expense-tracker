import { styled } from "../../stitches.config";

export const Text = styled("p", {
  fontSize: "1rem",

  variants: {
    color: {
      danger: {
        color: "red",
      },
      success: {
        color: "green",
      },
    },
    size: {
      1: {
        fontSize: "0.8rem",
      },
      2: {
        fontSize: "1rem",
      },
      3: {
        fontSize: "1.3rem",
      },
      4: {
        fontSize: "1.7rem",
      },
      5: {
        fontSize: "2rem",
      },
      6: {
        fontSize: "2.5rem",
      },
      7: {
        fontSize: "3rem",
      },
    },
  },
});
