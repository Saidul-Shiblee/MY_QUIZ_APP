import { Avatar, TextField, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import { getDatabase, ref, set } from "firebase/database";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import signupImage from "../assets/signup.svg";
import { useAuth } from "../context/Authcontext";
import PageHeading from "../components/pageheading";
import useFormValidation from "../hooks/useFormValidation";

const Signup = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState();
  const { signup, update } = useAuth();
  const neviagate = useNavigate();

  const [values, error, setError, handleChange, handleBlur, handleSubmit] =
    useFormValidation(submit, setOpen);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  async function submit() {
    try {
      // setValues({ ...values, error: "" });
      setLoading(true);
      let userInfo = await signup(values.email, values.password);
      await update(values.userName);
      const db = getDatabase();
      const resultListRef = ref(db, `user/${userInfo.user.uid}`);
      await set(resultListRef, {
        email: userInfo.user.email,
        name: userInfo.user.displayName,
      });
      neviagate("/");
    } catch (err) {
      setLoading(false);
      setError({
        ...error,
        firebaseError: err.message,
      });
      return setOpen(true);
    }
  }

  return (
    <Box
      sx={{
        background: "#f2f4f8",
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: "50px" }}
        open={open}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {Array.from(Object.values(error)).map((err, index) => (
            <p key={index}> {err}</p>
          ))}
        </Alert>
      </Snackbar>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: "16px" }}
        width="90%"
      >
        <Grid item xs={12}>
          <PageHeading title="Create an Account" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <img
              src={signupImage}
              width=""
              alt={"illustration"}
              style={{ maxWidth: "80%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                disabled={open}
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                autoComplete="userName"
              />
              <TextField
                margin="normal"
                disabled={open}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                autoComplete="email"
              />
              <TextField
                margin="normal"
                disabled={open}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onBlur={handleBlur}
                autoComplete="current-password"
                onChange={handleChange}
                value={values.password}
              />
              <TextField
                margin="normal"
                disabled={open}
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="Confirm Password"
                onBlur={handleBlur}
                autoComplete="current-password"
                onChange={handleChange}
                value={values.confirmPassword}
              />
              <Button
                disabled={
                  loading ||
                  open ||
                  !values.userName ||
                  !values.email ||
                  !values.password ||
                  !values.confirmPassword
                }
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
