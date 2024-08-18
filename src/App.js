import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import "./App.css";

export default function App() {
    const [title, setTitle] = useState("Carregando...");

    const updateTitle = (title) => {
        setTitle(title);
    };

    return (
        <div className="App">
            <Header />
            <div className="content-footer">
            <p className="content-title">{title}</p>
                <div className="content">
                    <Outlet context={{ updateTitle }} />
                </div>
                <Footer />
            </div>
        </div>
    );
}
