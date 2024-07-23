document.addEventListener("DOMContentLoaded", function () {
    const firebaseConfig = {
        apiKey: "AIzaSyAxfJW-BXx1-p_p2DBoiQYa8tGea2Fnfhk",
        authDomain: "heros-shop-i.firebaseapp.com",
        databaseURL: "https://heros-shop-i-default-rtdb.firebaseio.com",
        projectId: "heros-shop-i",
        storageBucket: "heros-shop-i.appspot.com",
        messagingSenderId: "507180461676",
        appId: "1:507180461676:web:3ace08b9c5d65709a33249",
    };

    document.getElementById("signup").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        firebase.initializeApp(firebaseConfig);

        const signupForm = document.getElementById("signup");

        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = signupForm.email.value;
            const password = signupForm.password.value;
            const nome = signupForm.name.value;
            const cpf = signupForm.cpf.value;
            const telefone = signupForm.telefone.value;
            const foto = signupForm.foto.value;
            const buildingName = signupForm.building_name.value;
            const houseNumber = signupForm.house_number.value;
            const street = signupForm.street.value;
            const neighborhood = signupForm.neighborhood.value;
            const city = signupForm.city.value;
            const state = signupForm.state.value;
            const country = signupForm.country.value;
            const zipCode = signupForm.zip_code.value;

            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
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
                        country: country,
                        zip_code: zipCode,
                    };

                    const addressRef = firebase.database().ref("address");

                    addressRef
                        .push(addressData)
                        .then((addressSnapshot) => {
                            const addressId = addressSnapshot.key;

                            const userData = {
                                cpf: cpf,
                                name: nome,
                                phone_number: telefone,
                                foto: foto,
                                default_address: addressId,
                            };

                            const userRef = firebase.database().ref("user/" + uid);

                            userRef
                                .set(userData)
                                .then(() => {
                                    window.location.href = `../../${localStorage.getItem("lastPage")}`;
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
        });

        function getErrorMessage(error) {
            return error.message;
        }
    });
});

const zipCodeInput = document.getElementById("zip_code");

zipCodeInput.addEventListener("input", function (e) {
    const streetInput = document.getElementById("street");
    const buildingNameInput = document.getElementById("building_name");
    const neighborhoodInput = document.getElementById("neighborhood");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");

    if (e.target.value.length >= 8) {
        fetch(`https://viacep.com.br/ws/${zipCodeInput.value}/json`)
            .then((response) => response.json())
            .then((cepData) => {
                if (cepData.logradouro) {
                    streetInput.value = cepData.logradouro;
                } else {
                    streetInput.value = "";
                }

                if (cepData.complemento) {
                    buildingNameInput.value = cepData.complemento;
                } else {
                    buildingNameInput.value = "";
                }

                if (cepData.bairro) {
                    neighborhoodInput.value = cepData.bairro;
                } else {
                    neighborhoodInput.value = "";
                }

                if (cepData.localidade) {
                    cityInput.value = cepData.localidade;
                } else {
                    cityInput.value = "";
                }

                if (cepData.uf) {
                    stateInput.value = cepData.uf;
                } else {
                    stateInput.value = "";
                }
            });
    } else {
        streetInput.value = "";
        buildingNameInput.value = "";
        neighborhoodInput.value = "";
        cityInput.value = "";
        stateInput.value = "";
    }
});
