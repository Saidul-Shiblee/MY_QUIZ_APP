import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useQuestionList = (videoID) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestionList() {
      const db = getDatabase();

      const questionListRef = ref(db, `quiz/${videoID}/questions`);
      const questionList = query(questionListRef, orderByKey());

      try {
        setError("");
        setLoading(true);
        const snapshot = await get(questionList);
        setLoading(false);
        if (snapshot.exists()) {
          setQuestions((prevQuestion) => {
            return [...prevQuestion, ...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    }
    getQuestionList();
  }, [videoID]);

  return {
    loading,
    error,
    questions,
  };
};

export default useQuestionList;
