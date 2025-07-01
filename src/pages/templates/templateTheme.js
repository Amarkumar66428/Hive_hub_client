import { alpha, createTheme } from "@mui/material";

const templateTheme = (theme) => {
  return createTheme({
    palette: {
      primary: {
        main: theme.primaryColor || "#801B7C",
        dark: alpha(theme.primaryColor, 0.9) || alpha("#801B7C", 0.8),
        light: alpha(theme.primaryColor, 0.8) || alpha("#801B7C", 0.6),
      },
      secondary: {
        main: theme.secondaryColor,
      },
      background: {
        default: "#f4f6f8",
      },
      text: {
        primary: theme.textColor,
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
      fontFamily: '"Arial", "Helvetica", sans-serif',
      h4: {
        fontWeight: 700,
        letterSpacing: "1px",
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: "15px",
            overflow: "visible",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fafafa",
              "&:hover": {
                backgroundColor: "#ffffff",
              },
              "&.Mui-focused": {
                backgroundColor: "#ffffff",
              },
            },
          },
        },
      },
    },
  });
};

export default templateTheme;