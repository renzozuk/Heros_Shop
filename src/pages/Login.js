
import React, { useState,useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useOutletContext,useNavigate } from "react-router-dom";
import "./Login.css";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();

    const { updateTitle } = useOutletContext();

    useEffect(() => {
        document.title = `Login | Hero´s Shop`;
        updateTitle(`Login`);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                localStorage.setItem("currentUser", auth.currentUser.uid);
                localStorage.setItem("users.name",auth.currentUser.email);
                navigate(localStorage.getItem("lastPage") || "/");
            })
            .catch((error) => {
                console.error("Erro ao fazer login: ", error.message);
                alert("Erro ao fazer login. Verifique suas credenciais.");
            });
    };

    return (
        <section className="main-content">
    
            <div className="container small_container">
                <form onSubmit={handleSubmit}>
                    <div className="input-box input-box-small">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box input-box-small">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="submit-button">
                        <button type="submit">Entrar</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default LoginForm;
