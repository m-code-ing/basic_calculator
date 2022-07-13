import { Button, Grid } from "@mui/material";
import { ButtonType, ButtonTypes } from "./App";

type NumPadProps = {
  buttons: ButtonType[];
  handleClick: (type: ButtonTypes, value: string | number) => void;
};

const NumPad = ({ buttons, handleClick }: NumPadProps) => {
  const buttonMap: ButtonType[] = [];

  if (buttons)
    buttons.forEach((button) => {
      if (button.type === "digits" && Array.isArray(button.value)) {
        button.value.forEach((val) => {
          buttonMap.push({ type: button.type, value: val });
        });
      } else {
        buttonMap.push({ type: button.type, value: button.value });
      }
    });

  return (
    <>
      {buttonMap.map((button, index) => (
        <Grid item border={1} xs={4} textAlign="center" key={index}>
          <Button
            onClick={() =>
              handleClick && handleClick(button.type, button.value)
            }
            fullWidth>
            {button.value}
          </Button>
        </Grid>
      ))}
    </>
  );
};

export default NumPad;
