import { styled } from "../../stitches.config";

export const Select = styled("select", {
  background: "none",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "none",
  borderBottom: "1px solid transparent",
  borderRadius: 6,
  color: "inherit",
  padding: 15,
  paddingLeft: 5,
  transition: "all 0.1s ease",
  width: "100%",
  boxShadow: "5px 5px 10px rgba(0,0,0,0.1)",

  "&:focus, &:active": {
    borderBottom: "1px solid white",
    height: "auto",
    color: "black",
    outline: 0,
    padding: 15,
    paddingLeft: 20,
  },
});
