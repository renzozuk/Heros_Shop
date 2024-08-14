import { useState, useEffect } from 'react';
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
                    <li className="header-navbar-item"><a className="header-navbar-link" href="#" target="_parent">Home</a></li>
                    <li className="header-navbar-item"><a className="header-navbar-link" href="#" target="_parent">Action Figures</a></li>
                    <li className="header-navbar-item"><a className="header-navbar-link" href="#" target="_parent">Cosplay</a></li>
                    <li className="header-navbar-item"><a className="header-navbar-link" href="#" target="_parent">Diversos</a></li>
                    {localStorage.getItem("currentUser") && <li className="header-navbar-item"><a className="header-navbar-link" href="#" target="_parent"><i class="fas fa-user"></i> Meu Perfil</a></li>}
                    {localStorage.getItem("currentUser") && <li className="header-navbar-item"><a className="header-navbar-link" href="#" target="_parent"><i class="fas fa-user"></i> Meus Pedidos</a></li>}
                </ul>
                <ul className="header-navbar-section">
                    <li className="header-navbar-item">Contato: +55(84)99999-9999 | contato@heroshop.com</li>
                </ul>
            </nav>
        </div>
    );
}