import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    h1: {
      color: "#fcfcfd",
      fontSize: "2em",
      fontWeight: 700,
    },
    h2: {
      color: "#fcfcfd",
      fontSize: "1.8em",
      fontWeight: 700,
    },
    h3: {
      color: "#fcfcfd",
      fontSize: "1.6em",
      fontWeight: 700,
    },
    h4: {
      color: "#fcfcfd",
      fontSize: "1.4em",
      fontWeight: 700,
    },
    h5: {
      color: "#fcfcfd",
      fontSize: "1.2em",
      fontWeight: 400,
    },
    h6: {
      color: "#fcfcfd",
      fontSize: "1em",
      fontWeight: 400,
    },
    subtitle1: {
      color: "#a9b1b7",
      fontSize: ".9em",
      fontWeight: 700,
      letterSpacing: ".02em",
      textTransform: "uppercase",
    },
    subtitle2: {
      color: "#a9b1b7",
      fontSize: ".7em",
      fontWeight: 700,
      letterSpacing: ".02em",
      textTransform: "uppercase",
    },
    body1: {
      color: "#a9b1b7",
      fontSize: "1.1em",
      fontWeight: 400,
    },
    body2: {
      color: "#a9b1b7",
      fontSize: "1em",
      fontWeight: 400,
    },
    fontFamily: "Montserrat",
  },
  palette: {
    type: "dark",
    primary: {
      main: "#ffcc00",
    },
    secondary: {
      main: "#212c34",
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#293640",
      },
    },
  },
});

export default theme;
