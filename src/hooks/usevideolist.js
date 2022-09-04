import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

const useVideoList = (page) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function getVideoList() {
      const db = getDatabase();

      const videoListRef = ref(db, "videos");
      const videoList = query(
        videoListRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(6)
      );

      try {
        setError("");
        setLoading(true);
        const snapshot = await get(videoList);
        setLoading(false);
        if (snapshot.exists()) {
          setVideos((prevVideos) => {
            return [...prevVideos, ...Object.values(snapshot.val())];
          });
        } else {
          setHasMore(false);
          console.log(hasMore);
        }
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    }
    getVideoList();
  }, [page, hasMore]);

  return {
    loading,
    error,
    videos,
    hasMore,
  };
};

export default useVideoList;
