import { styled } from "../../stitches.config";

export const Button = styled("button", {
  background: "$btnPrimary",
  color: "White",
  fontSize: "1rem",
  fontWeight: "bold",
  border: "none",
  borderRadius: 6,
  padding: 16,
  boxShadow: "5px 5px 10px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&:active": {
    transform: "scale(0.95)",
  },

  variants: {
    type: {
      success: {
        background: "$btnPrimary",
      },
    },
  },
});
