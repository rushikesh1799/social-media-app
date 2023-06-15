import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <DataProvider>
                    <App />
                </DataProvider>
            </AuthProvider>
        </Router>
    </React.StrictMode>
);
