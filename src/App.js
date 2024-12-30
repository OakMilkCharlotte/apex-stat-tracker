import './App.css';
import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import { database } from './firebase';
import { ref, set } from "firebase/database";


function App() {
  return (
    <Router>
      <div>
        <nav style={styles.navbar}>
          <Link to="/tab1" style={styles.link}>Tab 1</Link>
          <Link to="/tab2" style={styles.link}>Tab 2</Link>
        </nav>
        <Routes>
          <Route path="/tab1" element={<Tab1 />} />
          <Route path="/tab2" element={<Tab2 />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    padding: "1rem",
    backgroundColor: "#282c34",
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.2rem",
  },
};

export default App;



// Form submission information


// Split #
// RP Gained
// Rank
// Team KP
// Placement
// Date
// Map
// HighFiveGod's Legend
// TheGrumbleBear's Legend
// OakMilkCharlotte's Legend
// Reason we died


















// function SimpleForm() {
//   const [inputValue, setInputValue] = useState("");

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleSubmit = () => {
//     const userId = new Date().getTime(); // Generate a simple unique ID for the user
//     writeData(userId, inputValue, "example@example.com");
//     setInputValue(""); // Clear the input field after submission
//     alert("Data submitted successfully!");
//   };

//   const writeData = (userId, name, email) => {
//     set(ref(database, `users/${userId}`), {
//       username: name,
//       email: email,
//     })
//       .then(() => {
//         console.log("Data written successfully!");
//       })
//       .catch((error) => {
//         console.error("Error writing data:", error);
//       });
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h1>Submit Your Data</h1>
//       <input
//         type="text"
//         placeholder="Enter your name"
//         value={inputValue}
//         onChange={handleInputChange}
//         style={{
//           padding: "10px",
//           fontSize: "16px",
//           width: "200px",
//         }}
//       />
//       <button
//         onClick={handleSubmit}
//         style={{
//           padding: "10px 20px",
//           marginLeft: "10px",
//           fontSize: "16px",
//           cursor: "pointer",
//         }}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }

// export default SimpleForm;





