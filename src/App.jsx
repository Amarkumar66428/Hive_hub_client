import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import { ThemeProvider } from "@emotion/react";
import theme from "./utils/theme";
import { SnackbarProvider } from "./features/snackBar";
import ServerError from "./pages/ServerError";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./sass/global.scss";
import "./sass/temp1.scss";
import "./sass/temp2.scss";
import "./sass/temp3.scss";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SnackbarProvider>
            <AppRouter />
            <ServerError />
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
