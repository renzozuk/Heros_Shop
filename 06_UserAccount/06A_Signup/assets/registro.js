
document.addEventListener("DOMContentLoaded", function (){
    const firebaseConfig = {
        apiKey: "AIzaSyAxfJW-BXx1-p_p2DBoiQYa8tGea2Fnfhk",
        authDomain: "heros-shop-i.firebaseapp.com",
        databaseURL: "https://heros-shop-i-default-rtdb.firebaseio.com",
        projectId: "heros-shop-i",
        storageBucket: "heros-shop-i.appspot.com",
        messagingSenderId: "507180461676",
        appId: "1:507180461676:web:3ace08b9c5d65709a33249",
    };
    firebase.initializeApp(firebaseConfig);
    

    document.getElementById("signup").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário
    
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = "../../01_Homepage/index.html";
            })
            .catch(error => {
                alert(getErrorMessage(error));
            });
    });
    
    function getErrorMessage(error) {
        return error.message;
    }
    
    })



    
    