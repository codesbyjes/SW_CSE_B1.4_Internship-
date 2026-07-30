import { createContext, useContext } from "react";

const ThemeContext = createContext();

//child component
function ThemedBox() {
    const theme = useContext(ThemeContext);

    return(
        <div
        className={`hook-box theme-${theme}`} 
        style = {{
            background: theme === "dark" ? "#1c1b1b" : "#fff",
            color: theme === "dark" ? "#fff" : "#1c1b1b",
            padding: 15,
        }}
        >
           <p>Current theme: {theme}</p>
        </div>
    );
}

// Parent component
function ThemeProviderDemo() {
    const currentTheme = "light";
    return(
        <div>
            <ThemeContext.Provider value={currentTheme}>
                <ThemedBox />
                <ThemedBox />
            </ThemeContext.Provider>
        </div>
    );
}

export default ThemeProviderDemo;