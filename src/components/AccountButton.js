import { useState } from "react";
import "./AccountButton.css";

export default function AccountButton(props) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    }

    const handleMouseOut = () => {
        setIsHovered(false);
    }

    return (
        <div className={`account-button ${props.side}-button`} style={(props.side === "right" || !localStorage.getItem("currentUser")) ? { cursor: "pointer" } : {}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {localStorage.getItem("currentUser") ? 
            <div className="inner-account-button">{props.side === "right" ? <div className="inner-account-button" style={{ color: isHovered ? "#ff2d00" : "#ffffff" }}><i className="fas fa-door-open"></i><p className="account-button-text">Sair</p></div> : <div className="inner-account-button"><p className="greeting-text">{`Olá, ${localStorage.getItem("currentUser")}!`}</p></div> }</div> : 
            <div className="inner-account-button" style={{ color: isHovered ? "#ff2d00" : "#ffffff" }}><i class="fas fa-user"></i><p className="account-button-text">{props.side === "left" ? "Criar Conta" : "Entrar"}</p></div>}
        </div>
    );
}