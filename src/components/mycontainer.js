import { styled } from "@mui/material/styles";

const MyContainer = styled("div")(({ mt }) => ({
  maxWidth: "90%",
  marginTop: mt,
}));

export default MyContainer;
