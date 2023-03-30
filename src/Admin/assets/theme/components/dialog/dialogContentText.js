
import typography from "../../../theme/base/typography";
import colors from "../../../theme/base/colors";

// Material Dashboard 2 React helper functions
// import pxToRem from "../../../theme/functions/pxToRem";

const { size } = typography;
const { text } = colors;

const dialogContentText = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main,
    },
  },
};

export default dialogContentText;
