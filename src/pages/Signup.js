import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import "./Signup.css";
import "./SignupLogin.css";

const firebaseConfig = {
    apiKey: "AIzaSyAxfJW-BXx1-p_p2DBoiQYa8tGea2Fnfhk",
    authDomain: "heros-shop-i.firebaseapp.com",
    databaseURL: "https://heros-shop-i-default-rtdb.firebaseio.com",
    projectId: "heros-shop-i",
    storageBucket: "heros-shop-i.appspot.com",
    messagingSenderId: "507180461676",
    appId: "1:507180461676:web:3ace08b9c5d65709a33249",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export default function Signup() {
    const navigate = useNavigate();
    const { updateTitle } = useOutletContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [foto, setFoto] = useState("");
    const [buildingName, setBuildingName] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [street, setStreet] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    /* const [country, setCountry] = useState(""); */
    const [zipCode, setZipCode] = useState("");

    useEffect(() => {
        document.title = `Criar Conta | Hero´s Shop`;
        updateTitle(`Criar Conta`);
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const uid = user.uid;

                const addressData = {
                    building_name: buildingName,
                    house_number: houseNumber,
                    street: street,
                    neighborhood: neighborhood,
                    city: city,
                    state: state,
                    country: "Brazil",
                    zip_code: zipCode,
                };

                const addressRef = ref(database, "address");
                const newAddressRef = push(addressRef);

                set(newAddressRef, addressData)
                    .then(() => {
                        const userData = {
                            cpf: cpf,
                            name: name,
                            phone_number: telefone,
                            foto: foto,
                            default_address: newAddressRef.key,
                        };

                        const userRef = ref(database, "user/" + uid);

                        set(userRef, userData)
                            .then(() => {
                                const lastPage = localStorage.getItem("lastPage") || "/";
                                navigate(lastPage);
                            })
                            .catch((error) => {
                                console.error("Erro ao enviar informações do usuário para o Realtime Database: ", error);
                                alert("Erro ao criar conta. Por favor, tente novamente mais tarde.");
                            });
                    })
                    .catch((error) => {
                        console.error("Erro ao enviar informações do endereço para o Realtime Database: ", error);
                        alert("Erro ao criar conta. Por favor, tente novamente mais tarde.");
                    });
            })
            .catch((error) => {
                alert(getErrorMessage(error));
            });
    };

    function Asterisk() {
        return (
            <span className="asterisk"> *</span>
        );
    }

    function getErrorMessage(error) {
        return error.message;
    }

    return (
        <div className="outer-signup-form">
            <div className="outer-advice">
                <p className="advice">Os campos com<Asterisk /> são obrigatórios.</p>
            </div>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="input-box">
                    <label htmlFor="name">Nome Completo<Asterisk /></label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Maria da Silva" required />
                </div>
                <div className="input-box">
                    <label htmlFor="email">Email<Asterisk /></label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="maria.silva@email.com" required />
                </div>
                <div className="input-box">
                    <label htmlFor="password">Senha<Asterisk /></label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" required />
                </div>
                <div className="input-box">
                    <label htmlFor="confirm_password">Confirmar Senha<Asterisk /></label>
                    <input type="password" id="confirm_password" name="confirm_password" placeholder="********" required />
                </div>
                <div className="input-box">
                    <label htmlFor="cpf">CPF<Asterisk /></label>
                    <input type="text" id="cpf" name="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" required />
                </div>
                <div className="input-box">
                    <label htmlFor="telefone">Telefone<Asterisk /></label>
                    <input type="text" id="telefone" name="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="+55(**)*****-****" required />
                </div>
                <div className="input-box">
                    <label htmlFor="foto">Link da foto</label>
                    <input type="text" id="foto" name="foto" value={foto} onChange={(e) => setFoto(e.target.value)} placeholder="https://example.com/photo.jpg" />
                </div>
                <div className="input-box">
                    <label htmlFor="street">Rua<Asterisk /></label>
                    <input type="text" id="street" name="street" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Avenida Paulista" required />
                </div>
                <div className="input-box">
                    <label htmlFor="house_number">Número<Asterisk /></label>
                    <input type="text" id="house_number" name="house_number" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} placeholder="100" required />
                </div>
                <div className="input-box">
                    <label htmlFor="building_name">Complemento</label>
                    <input type="text" id="building_name" name="building_name" value={buildingName} onChange={(e) => setBuildingName(e.target.value)} placeholder="" />
                </div>
                <div className="input-box">
                    <label htmlFor="neighborhood">Bairro<Asterisk /></label>
                    <input type="text" id="neighborhood" name="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} placeholder="" required />
                </div>
                <div className="input-box">
                    <label htmlFor="city">Cidade<Asterisk /></label>
                    <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="São Paulo" required />
                </div>
                <div className="input-box">
                    <label htmlFor="state">Estado<Asterisk /></label>
                    <input type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="SP" required />
                </div>
                {/* <div className="input-box">
                    <label htmlFor="country">País</label>
                    <input type="text" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Brazil" required />
                </div> */}
                <div className="input-box">
                    <label htmlFor="zip_code">CEP<Asterisk /></label>
                    <input type="text" id="zip_code" name="zip_code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="00000-000" required />
                </div>
                <div className="outer-submit-button">
                    <button className="submit-button" type="submit">Criar Conta</button>
                </div>
            </form>
        </div>
    );
}
