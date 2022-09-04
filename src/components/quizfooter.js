import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import * as React from "react";
import MyButton from "./button";
import MiniPlayer from "./mimniplayer";
import MySlider from "./slider";

const MyPpaer = styled(Paper)(({ theme }) => ({
  height: 60,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  marginTop: "20px",
  marginBottom: "20px",
  position: "relative",
}));

export default function QuizFooter({
  nextQuestion,
  previousQuestion,
  submit,
  step,
  videoID,
  title,
}) {
  return (
    <>
      <Grid item xs={12}>
        <MyPpaer component={"div"} elevation={2}>
          <MyButton
            bg={"#c8e6c9"}
            hover={"#81c784"}
            text={null}
            textcolor={"#002333"}
            texthover={"#002333"}
            handleClick={previousQuestion}
            icon={<ArrowBackIcon fontSize="large" />}
          />
          <MySlider step={step} />

          <MyButton
            bg={"#00e676"}
            hover={"#002333"}
            text={step === 100 ? "Submit" : "Next Question"}
            textcolor={"#002333"}
            texthover={"white"}
            handleClick={step === 100 ? submit : nextQuestion}
            icon={<ArrowForwardIcon fontSize="large" />}
          />
          <MiniPlayer videoID={videoID} title={title} />
        </MyPpaer>
      </Grid>
    </>
  );
}
