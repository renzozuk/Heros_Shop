import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
/* import Router from "./routes/Router.js"; */
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="content-footer">
                <p className="content-title">Title</p>
                <div className="content">
                    {/* <Router /> */}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
