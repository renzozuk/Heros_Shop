import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

export default function Header() {
    const [screenWidth, setScreenWidth] = useState(window.visualViewport.width);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.visualViewport.width);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="header">
            <img className="banner-image" src={screenWidth > 1250 ? "./banner.png" : "./banner_portrait.png"}></img>
            <nav className="header-navbar">
                <ul className="header-navbar-section">
                    <li className="header-navbar-item"><Link className="header-navbar-link" to="/" >Home</Link></li>
                    <li className="header-navbar-item"><Link className="header-navbar-link" to="/departments/action_figures">Action Figures</Link></li>
                    <li className="header-navbar-item"><Link className="header-navbar-link" to="/departments/cosplay">Cosplay</Link></li>
                    <li className="header-navbar-item"><Link className="header-navbar-link" to="/departments/diversos">Diversos</Link></li>
                    {localStorage.getItem("currentUser") && <li className="header-navbar-item"><Link className="header-navbar-link" to="#"><i class="fas fa-user"></i> Meu Perfil</Link></li>}
                    {localStorage.getItem("currentUser") && <li className="header-navbar-item"><Link className="header-navbar-link" to="#"><i class="fas fa-user"></i> Meus Pedidos</Link></li>}
                </ul>
                <ul className="header-navbar-section">
                    <li className="header-navbar-item">Contato: +55 84 99999-9999 | contato@heroshop.com</li>
                </ul>
            </nav>
        </div>
    );
}