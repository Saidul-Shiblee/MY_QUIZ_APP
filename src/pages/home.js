import Box from "@mui/material/Box";
import * as React from "react";
import MyContainer from "../components/mycontainer";
import VideoContainer from "../components/videocontainer";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAuth } from "../context/Authcontext";

const Home = () => {
  const [open, setOpen] = React.useState(true);
  const { currentUser } = useAuth();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Box
      sx={{
        background: "#f2f4f8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!currentUser && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ mt: "50px" }}
          open={open}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="primary"
            sx={{ width: "100%" }}
          >
            {
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "justify",
                }}
              >
                <p>To participate in the quiz ,please signup</p>
                <p> or</p>
                <p> sign in with email:test@test.com ,pw:test@123</p>
              </Box>
            }
          </Alert>
        </Snackbar>
      )}
      <MyContainer mt="50px">
        <VideoContainer />
      </MyContainer>
    </Box>
  );
};

export default Home;
