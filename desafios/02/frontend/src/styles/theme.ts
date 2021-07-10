import { purple, red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

const palette: PaletteOptions = {
  type: "light",
  primary: {
    main: purple['800'],
    contrastText: "#ffffff",
  },
  background: {
    default: "#242526",
  },
};

const theme = createTheme({
  palette,
});

export default theme;
