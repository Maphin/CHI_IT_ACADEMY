import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import HeroDetail from "./components/HeroDetail";
import Heroes from "./pages/Heroes";
import theme from "./components/theme";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <ThemeProvider theme={theme(darkMode)}>
            <CssBaseline />
            <Router>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
                <Box sx={{ml: "200px", padding: "20px"}}>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/heroes" element={<Heroes />}>
                            <Route path=":id" element={<HeroDetail />}/>
                        </Route>
                        <Route path="/about" element={<About />}/>
                    </Routes>
                </Box>
            </Router>
        </ThemeProvider>
    )
}

export default App;