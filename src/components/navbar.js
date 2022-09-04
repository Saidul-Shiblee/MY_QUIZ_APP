import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { AppBar, Toolbar, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/Authcontext";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

const styles = {
  border: {
    borderBottom: "1px solid #e5e5e5",
  },
  fontWeight: {
    fontWeight: "bold",
  },
};

const NavBar = () => {
  const { currentUser, signout } = useAuth();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState();
  const [error, setError] = React.useState();

  async function handleSignout() {
    try {
      setLoading(true);
      setError("");
      await signout();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
      return setOpen(true);
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ mt: "50px" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
        <AppBar position="fixed" style={styles.border} elevation={0}>
          <Toolbar>
            <Link to="/">
              <img
                alt="Logo"
                src={logo}
                style={{ width: "70px", height: "30px" }}
              />
            </Link>
            <Typography
              variant="h6"
              style={styles.fontWeight}
              component="div"
              sx={{ flexGrow: 1, ml: 2 }}
            >
              Learn with MSI
            </Typography>
            {!currentUser ? (
              <>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" sx={{ ml: 2, color: "blue" }}>
                    Signup
                  </Typography>
                </Link>
                <Link
                  to="/signin"
                  disabled={loading}
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant="body2" sx={{ ml: 2, color: "blue" }}>
                    Signin
                  </Typography>
                </Link>
              </>
            ) : (
              <>
                <AccountCircle />
                <Typography variant="body2" sx={{ ml: 2, color: "blue" }}>
                  {currentUser.displayName}
                </Typography>{" "}
                <LogoutRoundedIcon onClick={handleSignout} />
              </>
            )}
          </Toolbar>
        </AppBar>
        <Offset />
      </ThemeProvider>
    </>
  );
};

export default NavBar;
