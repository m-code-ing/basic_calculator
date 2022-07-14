import { Button, Grid, Stack } from "@mui/material";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import NumPad from "./NumPad";
import OperatorKeys from "./OperatorKeys";
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
  const [numDigits, setNumDigits] = useState<string>();
  const [firstNum, setFirstNum] = useState<number>();
  const [secondNum, setDigitTwo] = useState<number>();
  const [operator, setOperator] = useState<string>();
  const [result, setResult] = useState<number>();

  const updateNum = useCallback(() => {
    let num =
      numDigits === undefined || numDigits === ""
        ? undefined
        : parseFloat(numDigits as string);
    return num;
  }, [numDigits]);

  const handleSelectOperator = (operator: string) => {
    setNumDigits(undefined);
    if (!firstNum) {
      alert("Please select first number before selecting operator");
      return;
    }
    setOperator(operator);
  };

  const handleBackSpace = () => {
    setResult(undefined);
    if (secondNum) {
      setNumDigits(numDigits?.slice(0, numDigits.length - 1));
    } else {
      setNumDigits(firstNum?.toString());
      setOperator(undefined);
    }

    if (!secondNum && !operator)
      setNumDigits(numDigits?.slice(0, numDigits.length - 1));
  };

  const updateDigits = (digit: number | string, type?: ButtonTypes) => {
    if (!numDigits?.length && type === "decimal") {
      digit = "0.";
    }
    if (type === "backSpace") {
      handleBackSpace();
    } else {
      setNumDigits(numDigits ? ((numDigits + digit) as string) : String(digit));
    }
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
      updateDigits(value as number);
    } else if (type === "backSpace") {
      updateDigits(value, type);
    } else if (type === "operators") {
      handleSelectOperator(value as string);
    } else if (type === "digits") {
      updateDigits(value as number);
    }
  };

  const getResult = () => {
    setResult(updateCalResult());
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
    let num = updateNum();
    setFirstAndSecondNumbers(num, !operator ? "frist" : "second");
  }, [updateNum, numDigits, operator, setFirstAndSecondNumbers]);

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
          <OperatorKeys operators={operators} handleClick={handleClick} />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Button onClick={getResult}>Get Result</Button>
      </Grid>
    </Stack>
  );
}

export default App;
