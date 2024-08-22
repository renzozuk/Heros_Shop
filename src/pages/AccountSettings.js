import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updateEmail, updatePassword, deleteUser } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./AccountSettings.css";
import AddressForm from "../components/AddressForm";
import UserForm from "../components/UserForm";
import { capitalizeSentence } from "../util/Sentence";

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

function AccountSettings() {

    const { updateTitle } = useOutletContext();
    updateTitle(capitalizeSentence("Meu Perfil"));

    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [user, setUser] = useState(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [cpf, setCpf] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [photo, setPhoto] = useState("");
    const [buildingName, setBuildingName] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [street, setStreet] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");

    const loadUserData = () => {
        auth.onAuthStateChanged((authenticationUser) => {
            if (authenticationUser) {
                setAuthUser(authenticationUser);
                setEmail(authenticationUser.email)
                fetchUserData(authenticationUser.uid);
            } else {
                console.error("Usuário não autenticado");
            }
        });
    };

    const fetchUserData = (uid) => {
        fetch(`https://heros-shop-i-default-rtdb.firebaseio.com/user/${uid}.json`)
            .then((response) => response.json())
            .then((userData) => {
                setUser(userData);
                setName(userData.name);
                setCpf(userData.cpf);
                setPhoneNumber(userData.phone_number);
                setPhoto(userData.photo);

                if (userData.default_address) {
                    fetchAddressData(userData.default_address);
                }
            })
            .catch((error) => console.error("Erro ao buscar dados do usuário:", error));
    };

    const fetchAddressData = (addressId) => {
        fetch(`https://heros-shop-i-default-rtdb.firebaseio.com/address/${addressId}.json`)
            .then((response) => response.json())
            .then((addressData) => {
                setAddress(addressData);
                setBuildingName(addressData.building_name);
                setHouseNumber(addressData.house_number);
                setStreet(addressData.street);
                setNeighborhood(addressData.neighborhood);
                setCity(addressData.city);
                setState(addressData.state);
                setCountry(addressData.country);
                setZipCode(addressData.zip_code);
            })
            .catch((error) => console.error("Erro ao buscar dados do endereço:", error));
    };


    const handleSave = async () => {
        if (!password) {
            alert('Por favor, insira sua senha atual para confirmar as alterações.');
            return;
        }

        if (!authUser) {
            console.warn("Nenhum usuário autenticado encontrado.");
            return;
        }

        const credential = EmailAuthProvider.credential(authUser.email, password);
        try {
            await reauthenticateWithCredential(authUser, credential);

            const newEmail = email;

            if (authUser.email !== newEmail) {
                await updateEmail(authUser, newEmail);
            }

            if (newPassword || confirmPassword) {

                if (newPassword !== confirmPassword) {
                    alert("A nova senha não pôde ser confirmada. Tente novamente.");
                    return;
                }
                else if (newPassword.length < 6) {
                    alert("A senha deve conter pelo menos seis caracteres. Tente novamente.");
                    return;
                }
                else if (newPassword === confirmPassword) {
                    await updatePassword(authUser, newPassword);
                }

            }

            const userRef = ref(database, `user/${authUser.uid}`);
            await set(userRef, {
                name,
                cpf,
                phone_number: phoneNumber,
                photo: photo == null ? "" : photo,
                default_address: user.default_address
            });

            if (address) {
                const addressRef = ref(database, `address/${user.default_address}`);
                await set(addressRef, {
                    building_name: buildingName,
                    house_number: houseNumber,
                    street,
                    neighborhood,
                    city,
                    state,
                    country,
                    zip_code: zipCode
                });
            }

            alert("Alterações salvas com sucesso.");
            cleanPasswords();

        } catch (error) {
            console.error("Erro ao atualizar dados do usuário:", error);
            alert("Erro ao salvar alterações. Por favor, tente novamente.");
        }
    };

    function cleanPasswords() {
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }

    const handleDeleteAccount = async () => {
        if (!password) {
            alert('Por favor, insira sua senha atual para confirmar a exclusão.');
            return;
        }

        if (!authUser) {
            console.warn("Nenhum usuário autenticado encontrado.");
            return;
        }

        const credential = EmailAuthProvider.credential(authUser.email, password);
        try {
            await reauthenticateWithCredential(authUser, credential);

            await deleteUser(authUser);

            if (user) {
                const userRef = ref(database, `user/${authUser.uid}`);
                await set(userRef, null);

                const addressRef = ref(database, `address/${user.default_address}`);
                await set(addressRef, null);
            }


            localStorage.removeItem("currentUser");
            alert("Conta excluída com sucesso.");
            navigate("/");
        } catch (error) {
            console.error("Erro ao excluir a conta:", error);
            alert("Erro ao excluir a conta. Por favor, tente novamente.");
        }
    };

    const handleCancel = async () => {
        cleanPasswords();
        loadUserData();
    }

    useEffect(() => {
        loadUserData();
    }, []);

    function Asterisk() {
        return (
            <span className="asterisk"> *</span>
        );
    }

    return (
        <div className="outer-signup-form">
            <form onSubmit={(event) => { event.preventDefault(); handleSave(); }}>
                <div className="outer-advice">
                    <p className="advice">Os campos com<Asterisk /> são obrigatórios.</p>
                </div>                <UserForm
                    name={name} setName={setName}
                    email={email} setEmail={setEmail}
                    cpf={cpf} setCpf={setCpf}
                    phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                    photo={photo} setPhoto={setPhoto}
                    password={password} setPassword={setPassword}
                    newPassword={newPassword} setNewPassword={setNewPassword}
                    confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                />
                <AddressForm
                    buildingName={buildingName} setBuildingName={setBuildingName}
                    houseNumber={houseNumber} setHouseNumber={setHouseNumber}
                    street={street} setStreet={setStreet}
                    neighborhood={neighborhood} setNeighborhood={setNeighborhood}
                    city={city} setCity={setCity}
                    state={state} setState={setState}
                    country={country} setCountry={setCountry}
                    zipCode={zipCode} setZipCode={setZipCode}
                />
                <div className="input-box">
                    <label htmlFor="password">Digite sua senha atual para confirmar as suas alterações  <Asterisk /></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        required
                    />
                </div>
                <div className="outer-submit-button">
                    <button className="delete-button" type="button" onClick={handleDeleteAccount}>Apagar Conta</button>
                    <button className="submit-button" type="submit">Salvar Alterações</button>
                    <button className="cancel-button" type="button" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default AccountSettings;