import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#6a0dad" },
    secondary: { main: "#ff7f50" },
    background: { default: "#f6f7fb" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", borderRadius: 10 } },
    },
  },
});

export default theme;
