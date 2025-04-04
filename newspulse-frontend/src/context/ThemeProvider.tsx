import { createContext, useEffect, useState } from "react";

interface ThemeContextType{
    isDark : boolean,
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children}) => {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem("theme");
        return stored === "dark";
    });
    

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem("theme", newTheme ? "dark": "light");
    };

    useEffect(() => {
        const root = document.documentElement;
        if(isDark){
            root.classList.add("dark");
        }else{
            root.classList.remove("dark");
        }
    },[isDark]);

    return(
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};