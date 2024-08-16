import { Outlet } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="content-footer">
                <p className="content-title">Title</p>
                <div className="content">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
