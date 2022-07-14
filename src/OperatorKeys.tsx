import { Grid, Button, Typography } from "@mui/material";
import { ButtonTypes } from "./App";

type OperatorKeysProps = {
  operators: string[];
  handleClick: (type: ButtonTypes, op: string) => void;
};

const OperatorKeys = ({ operators, handleClick }: OperatorKeysProps) => {
  return (
    <>
      {operators.map((op, index) => (
        <Grid border={1} key={index}>
          <Button fullWidth onClick={() => handleClick("operators", op)}>
            <Typography>{op}</Typography>
          </Button>
        </Grid>
      ))}
    </>
  );
};

export default OperatorKeys;
