import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import Answer from "../components/answer";
import useQuestionList from "../hooks/usequestionlist";
import PageHeading from "../components/pageheading";
import QuizFooter from "../components/quizfooter";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "question":
      action.value.forEach((questions) =>
        questions.options.forEach((option) => (option.checked = false))
      );
      return action.value;

    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;
    default:
      return state;
  }
};

const Quiz = () => {
  const { id } = useParams();
  //Get data from firebase with help of calling this function
  const { questions, loading, error } = useQuestionList(id);
  const { currentUser } = useAuth();
  //Local states of this componet
  const intialProgress = 100 / questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [qna, dispatch] = React.useReducer(reducer, initialState);
  const [progressValue, setProgressValue] = React.useState(intialProgress);
  const nevigate = useNavigate();
  const location = useLocation();
  const { title } = location.state;
  //
  React.useEffect(() => {
    if (questions && questions.length > 0) {
      dispatch({
        type: "question",
        value: questions,
      });
      setProgressValue(100 / questions.length);
    }
  }, [questions]);

  //Function to neviagate to next question
  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((cqp) => cqp + 1);
    }
    if (progressValue < 100)
      setProgressValue((pv) => pv + 100 / questions.length);
  };

  //Function to neviagate to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion >= 1) {
      setCurrentQuestion((cqp) => cqp - 1);
    }
    if (progressValue > 100 / questions.length) {
      setProgressValue((pv) => pv - 100 / questions.length);
    }
  };

  //Funtion to control checkbox state
  const handleAnswerChange = (e, index) => {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };
  //Function to submit answer
  async function handleSubmit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultListRef = ref(db, `result/${uid}`);
    await set(resultListRef, {
      [id]: qna,
    });

    nevigate(`/result/${id}`, { state: { qna } });
  }

  return (
    <>
      {loading && <div> Loading...</div>}
      {error && <div> There Was an Error...</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <Box
          sx={{
            background: "#f2f4f8",
            display: "flex",
            flexDirection: "column",
            placeItems: "center",
            position: "relative",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: "16px" }}
            width="90%"
          >
            <Grid item xs={12}>
              <PageHeading
                title={qna[currentQuestion].title}
                subTitle="Question can have multiple answers"
              />
            </Grid>
            <Answer
              options={qna[currentQuestion].options}
              handleChange={handleAnswerChange}
              input
            />

            <QuizFooter
              nextQuestion={handleNextQuestion}
              previousQuestion={handlePreviousQuestion}
              step={progressValue}
              submit={handleSubmit}
              videoID={id}
              title={title}
            />
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Quiz;
