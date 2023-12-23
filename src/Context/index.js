import { createContext } from "react";

const NxtThemeContext = createContext({
    isDarkTheme: 'light',
    toggleTheme: () => {},
    savedVideos: [],
    addToSavedVideos: () => {},
  })
  
  export default NxtThemeContext