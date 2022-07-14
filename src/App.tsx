import { ThemeProvider } from "@mui/material";
import Calculator from "./Calculator";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Calculator />
    </ThemeProvider>
  );
}

export default App;
