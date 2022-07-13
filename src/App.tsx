import { Button, Grid, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Result from "./Result";

const dot = ".";
const backSpace = "backSpace";
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, dot, backSpace];

const operators = ["+", "-", "*", "/"];

function App() {
  const [numDigits, setNumDigits] = useState<number[]>([]);
  const [firstNum, setFirstNum] = useState<number>();
  const [secondNum, setDigitTwo] = useState<number>();
  const [operator, setOperator] = useState<string>();
  const [result, setResult] = useState<number>();

  const calcFirstNum = useCallback(() => {
    let number: number | undefined;
    let tensPalce = 0;
    numDigits.forEach((digit) => {
      tensPalce = tensPalce > 0 ? 10 : 1;
      number = number ? number * tensPalce + digit : digit;
    });
    return number;
  }, [numDigits]);

  const handleSelectOperator = (operator: string) => {
    if (!firstNum) {
      alert("First Select Digit one");
      return;
    }
    setOperator(operator);
  };

  const handleSelectDigit = (digit: number) => {
    setNumDigits([...numDigits, digit]);
  };

  const setFirstAndSecondNumbers = useCallback(
    (num: number | undefined, whichNumber: string) => {
      if (whichNumber === "second") {
        setDigitTwo(num);
      } else {
        setFirstNum(num);
      }
    },
    []
  );

  const handleClick = (buttonContent: any) => {
    if (buttonContent === ".") {
      console.log("add decimal");
    } else if (buttonContent === "backSpace") {
      numDigits.pop();
      setNumDigits([...numDigits]);
    } else if (typeof buttonContent !== "number") {
      setNumDigits([]);
      handleSelectOperator(buttonContent);
    } else if (typeof buttonContent === "number") {
      handleSelectDigit(buttonContent);
    }
  };

  const updateCalResult = useCallback(() => {
    if (firstNum !== undefined && secondNum !== undefined) {
      switch (operator) {
        case "+":
          return firstNum + secondNum;

        case "-":
          return firstNum - secondNum;

        case "*":
          return firstNum * secondNum;

        case "/":
          return firstNum / secondNum;

        default:
          break;
      }
    }
  }, [firstNum, secondNum, operator]);

  useEffect(() => {
    if (secondNum !== undefined) setResult(updateCalResult());
  }, [secondNum, updateCalResult]);

  // TODO --> commented below code as for now.  Need to execute this code on pressing result button.  Note: Result button needs to be added first.
  // useEffect(() => {
  //   setFirstNum(undefined);
  //   setDigitTwo(undefined);
  //   setOperator(undefined);
  // }, []);

  useEffect(() => {
    let num = calcFirstNum();
    setFirstAndSecondNumbers(num, !operator ? "frist" : "second");
  }, [calcFirstNum, numDigits, operator, setFirstAndSecondNumbers]);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      display="flex"
      minHeight="100%"
      border={1}>
      <Result
        result={result}
        firstNum={firstNum}
        secondNum={secondNum}
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
