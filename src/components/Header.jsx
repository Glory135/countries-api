import React, { useContext } from "react";
import { ThemeContext } from "../App";

export const Header = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <div
      style={{
        color: darkMode ? "white" : "black",
        backgroundColor: darkMode ? "hsl(209, 23%, 22%)" : "white",
      }}
      className='header'
    >
      <div className='header-container'>
        <h2>Where in the world?</h2>
        <div
          style={{
            backgroundColor: darkMode ? "hsl(208, 15%, 25%)" : "white",
          }}
          onClick={() => setDarkMode(!darkMode)}
          className='mode-container'
        >
          <i className='fas fa-moon'></i>
          <p>dark mode</p>
        </div>
      </div>
    </div>
  );
};
