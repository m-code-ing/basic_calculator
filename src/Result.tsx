import { Grid, Typography, Stack } from "@mui/material";

type ResultProps = {
  firstNum?: number;
  secondNum?: number;
  operator?: string;
  result?: number;
};

const Result = ({ firstNum, secondNum, operator, result }: ResultProps) => {
  return (
    <Grid container justifyContent="center" textAlign="center">
      <Typography mx={3}>
        {firstNum !== undefined ? firstNum : "Select First Digit"}
      </Typography>

      <Typography mx={3}>{operator || "Select Operator"}</Typography>

      <Typography mx={3}>
        {secondNum !== undefined ? secondNum : "Select Second Digit"}
      </Typography>

      <Stack direction="row">
        <Typography mx={3}>{result !== undefined ? `=` : null}</Typography>
        <Typography mx={3}>
          {result !== undefined ? `  ${result}` : null}
        </Typography>
      </Stack>
    </Grid>
  );
};

export default Result;
