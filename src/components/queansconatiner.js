import Grid from "@mui/material/Grid";
import Answer from "./answer";
import PageHeading from "./pageheading";

const QueAnsContainer = ({ answer = [] }) => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      width="90%"
      mt="16px"
      mb="16px"
    >
      <Grid item xs={12}>
        <PageHeading title={answer.title} subTitle={null} />
      </Grid>
      {<Answer input={false} options={answer.options} />}
    </Grid>
  );
};

export default QueAnsContainer;
