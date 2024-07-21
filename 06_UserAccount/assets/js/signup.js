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
    firebase.initializeApp(firebaseConfig);

    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response);
                window.location.href = `../../${localStorage.getItem("lastPage")}`;
            })
            .catch((error) => {
                console.log("error", error);
            });
    });
});
