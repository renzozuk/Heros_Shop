document.addEventListener("DOMContentLoaded", function() {
    const firebaseConfig = {
        apiKey: "AIzaSyAxfJW-BXx1-p_p2DBoiQYa8tGea2Fnfhk",
        authDomain: "heros-shop-i.firebaseapp.com",
        databaseURL: "https://heros-shop-i-default-rtdb.firebaseio.com",
        projectId: "heros-shop-i",
        storageBucket: "heros-shop-i.appspot.com",
        messagingSenderId: "507180461676",
        appId: "1:507180461676:web:3ace08b9c5d65709a33249"
    };

    document.getElementById("signup").addEventListener("submit", function (event) {
        event.preventDefault();
    
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
    
    // Inicializar o Firebase
    firebase.initializeApp(firebaseConfig);

    // Capturar o formulário de criação de conta
    const signupForm = document.getElementById("signup");

    // Adicionar um ouvinte para o evento de envio do formulário
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar envio padrão do formulário

        // Capturar os valores dos campos do formulário
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

        // Registrar usuário no Firebase Authentication
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Usuário registrado com sucesso
                const user = userCredential.user;
                const uid = user.uid; // Obter o UID do usuário

                // Criar um objeto com os dados do endereço
                const addressData = {
                    building_name: buildingName,
                    house_number: houseNumber,
                    street: street,
                    neighborhood: neighborhood,
                    city: city,
                    state: state,
                    country: country,
                    zip_code: zipCode
                };

                // Referenciar o caminho correto para a coleção "address" no Realtime Database
                const addressRef = firebase.database().ref('address');

                // Adicionar os dados do endereço ao Realtime Database
                addressRef.push(addressData)
                    .then((addressSnapshot) => {
                        // Obter o ID do endereço criado
                        const addressId = addressSnapshot.key;

                        // Atualizar os dados do usuário com o ID do endereço padrão
                        const userData = {
                            cpf: cpf,
                            name: nome,
                            phone_number: telefone,
                            foto: foto,
                            default_address: addressId // Vincular o ID do endereço ao usuário
                        };

                        // Referenciar o caminho correto para a coleção "users" no Realtime Database
                        const userRef = firebase.database().ref('user/' + uid);

                        // Adicionar os dados do usuário ao Realtime Database
                        userRef.set(userData)
                            .then(() => {
                                // Redirecionar para a página inicial após o registro
                                window.location.href = "../../01_Homepage/index.html";
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
                // Tratar erros de registro de usuário
                alert(getErrorMessage(error));
            });
    });

    function getErrorMessage(error) {
        return error.message;
    }
});
