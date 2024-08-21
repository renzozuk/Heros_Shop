import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./Login.css";

function LoginForm() {
    const navigate = useNavigate();
    const { updateTitle } = useOutletContext();
    const auth = getAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        document.title = `Login | Hero´s Shop`;
        updateTitle(`Login`);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                localStorage.setItem("currentUser", auth.currentUser.uid);
                localStorage.setItem("users.name", auth.currentUser.email);
                navigate(localStorage.getItem("lastPage") || "/");
            })
            .catch((error) => {
                console.error("Erro ao fazer login: ", error.message);
                alert("Erro ao fazer login. Verifique suas credenciais.");
            });
    };

    return (
        <div className="outer-login-form" style={{ width: windowWidth > 1400 ? `12vw` : `${-39 / 700 * windowWidth + 90}vw` }}>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-box">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-box">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="outer-submit-button">
                    <button className="submit-button" type="submit">
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
