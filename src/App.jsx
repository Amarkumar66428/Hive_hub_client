import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import "./sass/global.scss";
import { ThemeProvider } from "@emotion/react";
import theme from "./utils/theme";
import { SnackbarProvider } from "./features/snackBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackbarProvider>
          <AppRouter />
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
