import React from "react";
import ReactDOM from "react-dom/client"; // Update this import statement
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; // Ensure this line is present

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
