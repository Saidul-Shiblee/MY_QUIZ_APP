import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import resultImage from "../assets/success.png";
import PageHeading from "./pageheading";

export default function ResultHeader({ score, noq }) {
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: "16px" }}
        width="90%"
      >
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            placeItems: "center",
          }}
        >
          <Typography variant="h6" component="p">
            Your score is
          </Typography>
          <Typography variant="h6" component="p">
            {score} out of {noq * 5}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={resultImage}
            width=""
            alt={"illustration"}
            style={{ maxWidth: "60%" }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        width="90%"
      >
        <Grid item xs={12}>
          <PageHeading title="Question Analysis" />
        </Grid>
      </Grid>
    </>
  );
}
