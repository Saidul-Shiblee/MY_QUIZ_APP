import { Box, Divider, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    h7: {
      fontSize: "2em",
      fontWeight: 700,
    },
    subtitle3: {
      fontSize: "1em",
      fontWeight: 700,
      color: "#7c83a7",
    },
  },
});

const PageHeading = ({ title, subTitle }) => {
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Typography sx={{ mb: "6px" }} variant="h7" component="p">
          {title}
        </Typography>

        <Typography sx={{ mb: "6px" }} variant="subtitle3" component="h4">
          {subTitle}
        </Typography>
        <Divider />
      </ThemeProvider>
    </Box>
  );
};

export default PageHeading;
