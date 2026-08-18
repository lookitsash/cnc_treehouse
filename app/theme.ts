import Link from "next/link";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2F6B4F",
      dark: "#245740",
      light: "#4C8969",
    },
    background: {
      default: "#F7F8F6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E2422",
      secondary: "#626B66",
    },
    divider: "#E3E7E3",
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "var(--font-inter), Helvetica, Arial, sans-serif",
    h4: { fontSize: "1.625rem", fontWeight: 600, letterSpacing: "-0.02em" },
    h6: { fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em" },
    subtitle1: { fontSize: "1rem", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  components: {
    MuiButtonBase: {
      defaultProps: { LinkComponent: Link },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { paddingInline: 16 },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
    },
  },
});

export default theme;
