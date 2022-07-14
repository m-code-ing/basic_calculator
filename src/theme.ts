import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        input: {
          textAlign: "center",
        },
      },
    },
  },
});
