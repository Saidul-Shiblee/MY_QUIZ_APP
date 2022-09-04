import { Box } from "@mui/material";
import _ from "lodash";
import * as React from "react";
import { useLocation, useParams } from "react-router-dom";
import useAnswerList from "../hooks/useranswerlist";
import QueAnsContainer from "../components/queansconatiner";
import ResultHeader from "../components/resultheader";

const Result = () => {
  const { id } = useParams();
  const location = useLocation();
  const { answers } = useAnswerList(id);
  const { qna } = location.state;

  function evaluate() {
    let score = 0;
    answers.forEach((question, index1) => {
      let correctIndexs = [],
        checkedIndexes = [];
      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexs.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexs, checkedIndexes)) {
        score = score + 5;
      }
    });
    return score;
  }

  let result = evaluate();

  console.log(result);

  return (
    <Box
      sx={{
        background: "#f2f4f8",
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
      }}
    >
      <ResultHeader score={result} noq={answers.length} />

      {answers.map((answer, index) => (
        <QueAnsContainer key={index} answer={answer} />
      ))}
    </Box>
  );
};

export default Result;
