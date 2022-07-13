import { Button, Grid, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Result from "./Result";

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ["+", "-", "*", "/"];

function App() {
  const [digitOne, setDigitOne] = useState<number>();
  const [digitTwo, setDigitTwo] = useState<number>();
  const [operator, setOperator] = useState<string>();
  const [result, setResult] = useState<number>();

  const handleSelectOperator = (operator: string) => {
    if (!digitOne) {
      alert("First Select Digit one");
      return;
    }
    setOperator(operator);
  };

  const handleSelectDigit = (digit: number) => {
    if (digitOne !== undefined && operator) {
      setDigitTwo(digit);
    } else {
      setDigitOne(digit);
    }
  };

  const handleClick = (buttonContent: any) => {
    if (typeof buttonContent !== "number") {
      handleSelectOperator(buttonContent);
    } else if (typeof buttonContent === "number") {
      handleSelectDigit(buttonContent);
    }
  };

  const updateCalResult = useCallback(() => {
    if (digitOne !== undefined && digitTwo !== undefined)
      switch (operator) {
        case "+":
          return digitOne + digitTwo;

        case "-":
          return digitOne - digitTwo;

        case "*":
          return digitOne * digitTwo;

        case "/":
          return digitOne / digitTwo;

        default:
          break;
      }
  }, [digitOne, digitTwo, operator]);

  useEffect(() => {
    if (digitTwo !== undefined) setResult(updateCalResult());
  }, [digitTwo, updateCalResult]);

  useEffect(() => {
    setDigitOne(undefined);
    setDigitTwo(undefined);
    setOperator(undefined);
  }, [result]);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      display="flex"
      minHeight="100%"
      border={1}>
      <Result
        result={result}
        digitOne={digitOne}
        digitTwo={digitTwo}
        operator={operator}
      />
      <Grid container direction="row" maxWidth="75%" justifyContent="center">
        <Grid container flex={3} justifyContent="center">
          {digits.map((digit, index) => (
            <Grid item border={1} xs={4} textAlign="center" key={index}>
              <Button onClick={() => handleClick(digit)} fullWidth>
                {digit}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid container direction="column" flex={1} border={1}>
          {operators.map((op, index) => (
            <Grid border={1} key={index}>
              <Button fullWidth onClick={() => handleClick(op)}>
                <Typography>{op}</Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Stack>
  );
}

export default App;
