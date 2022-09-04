import { Grid } from "@mui/material";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpin from "react-loading-spin";
import VideoCard from "./card";
import useVideoList from "../hooks/usevideolist";

const VideoContainer = () => {
  const [page, setPage] = useState(1);
  const { videos, loading, error, hasMore } = useVideoList(page);

  return (
    <>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => setPage(page + 6)}
        >
          <Grid
            container
            spacing={{ xs: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            {videos.map((video) => (
              <VideoCard
                title={video.title}
                noq={video.noq}
                id={video.youtubeID}
                key={video.youtubeID}
              />
            ))}
          </Grid>
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error!</div>}
      {loading && (
        <div className="ExampleOfUsage">
          <LoadingSpin />
        </div>
      )}
    </>
  );
};

export default VideoContainer;
