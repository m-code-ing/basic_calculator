import { Grid, Stack, Input } from "@mui/material";

type ResultProps = {
  firstNum?: number;
  secondNum?: number;
  operator?: string;
  result?: number;
};

const Result = ({ firstNum, secondNum, operator, result }: ResultProps) => {
  return (
    <Grid container justifyContent="center" textAlign="center" border={1}>
      <Stack direction="row" width="70%" justifyContent="space-around">
        <Grid item xs={3}>
          <Input value={firstNum || "First Number"} />
        </Grid>
        <Grid item xs={3}>
          <Input value={operator || "Operator"} />
        </Grid>
        <Grid item xs={3}>
          <Input value={secondNum || "Second Number"} />
        </Grid>
      </Stack>

      <Stack direction="row" width="30%">
        <Grid item>
          <Input value={result !== undefined ? `=` : ""} disableUnderline />
        </Grid>
        <Grid item mx={3}>
          <Input value={result || ""} readOnly disableUnderline />
        </Grid>
      </Stack>
    </Grid>
  );
};

export default Result;
