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

        // Registrar usuário no Firebase Authentication
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Usuário registrado com sucesso
                const user = userCredential.user;
                const uid = user.uid; // Obter o UID do usuário

                // Enviar informações do usuário para o Realtime Database
                firebase.database().ref('user/' + uid).set({
                    cpf: cpf,
                    name: nome,
                    phone_number: telefone,
                    photo: foto
                    // Adicione outros campos conforme necessário
                })
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
                // Tratar erros de registro de usuário
                alert(getErrorMessage(error));
            });
    });

    function getErrorMessage(error) {
        return error.message;
    }
});
