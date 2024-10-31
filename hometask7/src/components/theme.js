import { createTheme } from "@mui/material";

const theme = (darkMode) => createTheme({
    palette: {
        mode: darkMode ? "dark" : "light"
    }
})

export default theme;