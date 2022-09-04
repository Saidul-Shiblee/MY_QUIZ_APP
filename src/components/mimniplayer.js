import CancelIcon from "@mui/icons-material/CancelOutlined";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import { Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import ReactPlayer from "react-player/youtube";
import ActionButton from "./actionbutton";

const MiniPlayer = ({ videoID, title }) => {
  const videoURL = `https://www.youtube.com/watch?v=${videoID}`;
  const buttonRef = React.useRef();
  const playerRef = React.useRef();
  const [status, setStatus] = React.useState(false);

  function toggleMiniPlayer() {
    console.log(status);
    if (!status) {
      buttonRef.current.style.visibility = "hidden";
      playerRef.current.style.visibility = "visible";
      playerRef.current.classList.add("miniPlayerTransition");
      playerRef.current.classList.remove("miniPlayerTransitionRev");

      setStatus(true);
    } else {
      buttonRef.current.style.visibility = "visible";
      playerRef.current.classList.add("miniPlayerTransitionRev");
      playerRef.current.classList.remove("miniPlayerTransition");
      setStatus(false);
    }
  }
  return (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        backgroundColor: "transparent",
        right: "1%",
        bottom: "160%",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          backgroundColor: "transparent",
        }}
      >
        <Paper ref={playerRef} sx={{ visibility: "hidden" }}>
          <Paper
            elevation={2}
            sx={{
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
              width: "310px",
            }}
          >
            <ReactPlayer
              width="300px"
              height="168px"
              playing={status}
              controls={true}
              url={videoURL}
            />

            <p>{title}</p>
          </Paper>
          <Paper
            elevation={0}
            sx={{
              position: "absolute",
              backgroundColor: "transparent",
              top: "-8.5%",
              right: "-6%",
            }}
            onClick={toggleMiniPlayer}
          >
            <IconButton color="secondary">
              <CancelIcon />
            </IconButton>
          </Paper>
        </Paper>
        <Paper
          ref={buttonRef}
          elevation={0}
          sx={{
            position: "absolute",
            right: "-10%",
            bottom: "-15%",
            backgroundColor: "transparent",
          }}
          onClick={toggleMiniPlayer}
        >
          <ActionButton
            fontsize={"40px"}
            color={"#002333"}
            textcolor={"#00e676"}
          >
            <PlayCircleFilledOutlinedIcon />
          </ActionButton>
        </Paper>
      </Paper>
    </Paper>
  );
};

export default MiniPlayer;
