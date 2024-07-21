const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

document.addEventListener("DOMContentLoaded", getLoginStatus);

function getLoginStatus() {
    if(localStorage.getItem("currentUser")){
        const userInfoContent = document.createElement("p");

        userInfoContent.innerHTML = "Olá, {username here}!";

        leftButton.appendChild(userInfoContent);

        const exitButtonContent = document.createElement("ul");

        exitButtonContent.innerHTML = `<li><a target="_parent"><i class="fas fa-door-open" style="color: #ffffff;"></i> Sair</a></li>`;
        exitButtonContent.id = "exit-button";
        
        rightButton.appendChild(exitButtonContent);
        rightButton.onclick = function exit() {
            localStorage.setItem("currentUser", "");
            window.parent.location.href = `../${localStorage.getItem("lastPage")}`;
        }
    }else{
        const signupButtonContent = document.createElement("ul");
        
        signupButtonContent.innerHTML = `<li><a href="../06_UserAccount/06A_Signup/index.html" target="_parent"><i class="fas fa-user"></i> Criar Conta</a></li>`;

        leftButton.appendChild(signupButtonContent);

        const loginButtonContent = document.createElement("ul");

        loginButtonContent.innerHTML = `<li><a href="../06_UserAccount/06B_Login/index.html" target="_parent"><i class="fas fa-user"></i> Login</a></li>`;

        rightButton.appendChild(loginButtonContent);
    }
}

