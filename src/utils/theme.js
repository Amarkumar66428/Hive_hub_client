// theme.js or theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#801B7C",
    },
    secondary: {
      main: "#000",
    },
    background: {
      default: "#f4f6f8",
    },
    text: {
      primary: "#1a1a1a",
    },
    grey: {
      50: "#f9f9f9",
      100: "#f4f4f4",
      200: "#e9e9e9",
      300: "#e0e0e0",
      400: "#c4c4c4",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
