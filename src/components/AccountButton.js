import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./AccountButton.css";

export default function AccountButton(props) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        const currentUser = localStorage.getItem("currentUser");

        if (!currentUser) {
            if (props.side === "left") {
                navigate("/signup");
            } else {
                navigate("/login");
            }
        } else {
            if (props.side === "right") {
                signOut(auth)
                    .then(() => {
                        localStorage.removeItem("currentUser");
                        navigate("/");
                    })
                    .catch((error) => {
                        console.error("Erro ao sair da conta: ", error);
                    });
            }
        }
    };

    return (
        <div className={`account-button ${props.side}-button`} style={props.side === "right" || !localStorage.getItem("currentUser") ? { cursor: "pointer" } : {}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick}>
            {localStorage.getItem("currentUser") ? (
                <div className="inner-account-button">
                    {props.side === "right" ? (
                        <div className="inner-account-button" style={{ color: isHovered ? "#ff2d00" : "#ffffff" }}>
                            <i className="fas fa-door-open"></i>
                            <p className="account-button-text">Sair</p>
                        </div>
                    ) : (
                        <div className="inner-account-button">
                            <p className="greeting-text">{`Olá, seja bem-vindo!`}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="inner-account-button" style={{ color: isHovered ? "#ff2d00" : "#ffffff" }}>
                    <i className="fas fa-user"></i>
                    <p className="account-button-text">{props.side === "left" ? "Criar Conta" : "Entrar"}</p>
                </div>
            )}
        </div>
    );
}
