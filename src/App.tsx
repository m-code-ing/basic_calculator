import { Button, Grid, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import NumPad from "./NumPad";
import Result from "./Result";

export type ButtonTypes = keyof typeof buttons;
export type ButtonValues = typeof buttons[ButtonTypes]["value"];
export type ButtonType = { type: ButtonTypes; value: number | string };

const decimal = ".";
const backSpace = "backSpace";
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const operators = ["+", "-", "*", "/"];

const buttons = {
  digits: {
    type: "digits",
    value: digits,
  },
  decimal: {
    type: "decimal",
    value: decimal,
  },
  backSpace: { type: "backSpace", value: backSpace },
  operators: { type: "operator", value: operators },
};

const numPadButtons = [
  buttons.digits,
  buttons.decimal,
  buttons.backSpace,
] as Array<ButtonType>;

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

  const handleClick = (type: ButtonTypes, value: string | number) => {
    if (type === "decimal") {
      console.log("add decimal");
    } else if (type === "backSpace") {
      numDigits.pop();
      setNumDigits([...numDigits]);
    } else if (type === "operators") {
      setNumDigits([]);
      handleSelectOperator(value as string);
    } else if (type === "digits") {
      handleSelectDigit(value as number);
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
          <NumPad buttons={numPadButtons} handleClick={handleClick} />
        </Grid>
        <Grid container direction="column" flex={1} border={1}>
          {operators.map((op, index) => (
            <Grid border={1} key={index}>
              <Button fullWidth onClick={() => handleClick("operators", op)}>
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
