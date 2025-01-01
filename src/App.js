import './App.css';
import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Form from "./Form";
import Statistics from "./Statistics";
import { database } from './firebase';
import { ref, set } from "firebase/database";



function App() {

  return (
    <Router>
      <div>
        <nav style={styles.navbar}>
          <div style={styles.tabContainer}>
            <NavLink
              to="/form"
              style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              Form
            </NavLink>
            <NavLink
              to="/statistics"
              style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              Statistics
            </NavLink>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/form" />} />
          <Route path="/form" element={<Form />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 0",
    backgroundColor: "#282c34",
    width: "100%",
    color: "white",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  tabContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "25%", // Takes up 1/4 of the navbar
    paddingLeft: '20px',
  },
  link: {
    textDecoration: "none",
    color: "#fcaee9",
    fontSize: "1.3rem",
    padding: "0.5rem 1rem",
  },
  activeLink: {
    textDecoration: "none",
    color: "#fcaee9", // Highlight color for the active tab
    fontSize: "1.3rem",
    padding: "0.5rem 1rem",
    borderBottom: "2px solid #fcaee9", // Underline for the active tab
    fontWeight: "bold",
  },
};

export default App;
