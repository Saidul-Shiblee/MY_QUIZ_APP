import { Checkbox, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";

const MyPpaer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "start",
  color: theme.palette.text.secondary,
  height: 58,
  width: "100%",
}));

export default function Answer({ options = [], handleChange, input }) {
  return options.map((option, index) => (
    <Grid item xs={12} md={6} key={index}>
      <MyPpaer
        elevation={2}
        sx={{
          "&:hover": input ? { bgcolor: "#e0e0e0" } : { bgcolor: null },
          display: "flex",
          alignItems: "center",
          bgcolor: input
            ? "null"
            : option.correct
            ? "#00e676"
            : option.checked
            ? "#f44336"
            : "#e0e0e0",
        }}
      >
        {input ? (
          <>
            <Checkbox
              color="secondary"
              value={index}
              onChange={(e) => handleChange(e, index)}
              checked={option.checked}
            />
            <Typography variant="h6" component="p">
              {option.title}
            </Typography>
          </>
        ) : (
          <>
            <Checkbox
              color="secondary"
              defaultChecked={option.checked}
              disabled
            />
            <Typography variant="h6" component="p">
              {option.title}
            </Typography>
          </>
        )}
      </MyPpaer>
    </Grid>
  ));
}
