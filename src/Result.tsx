import { Grid, Typography, Stack } from "@mui/material";

type ResultProps = {
  digitOne?: number;
  digitTwo?: number;
  operator?: string;
  result?: number;
};

const Result = ({ digitOne, digitTwo, operator, result }: ResultProps) => {
  return (
    <Grid container justifyContent="center" textAlign="center">
      <Typography mx={3}>
        {digitOne !== undefined ? digitOne : "Select First Digit"}
      </Typography>

      <Typography mx={3}>{operator || "Select Operator"}</Typography>

      <Typography mx={3}>
        {digitTwo !== undefined ? digitTwo : "Select Second Digit"}
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
