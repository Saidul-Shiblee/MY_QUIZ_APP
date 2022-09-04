import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useAnswerList = (videoID) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function getAnswerList() {
      const db = getDatabase();
      const answerListRef = ref(db, `answers/${videoID}/questions`);
      const answerList = query(answerListRef, orderByKey());

      try {
        setError("");
        setLoading(true);
        const snapshot = await get(answerList);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    }
    getAnswerList();
  }, [videoID]);

  return {
    loading,
    error,
    answers,
  };
};

export default useAnswerList;
