import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import { database } from './firebase';
import { ref, set } from "firebase/database";

function SimpleForm() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    const userId = new Date().getTime(); // Generate a simple unique ID for the user
    writeData(userId, inputValue, "example@example.com");
    setInputValue(""); // Clear the input field after submission
    alert("Data submitted successfully!");
  };

  const writeData = (userId, name, email) => {
    set(ref(database, `users/${userId}`), {
      username: name,
      email: email,
    })
      .then(() => {
        console.log("Data written successfully!");
      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Submit Your Data</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={inputValue}
        onChange={handleInputChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "200px",
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default SimpleForm;
