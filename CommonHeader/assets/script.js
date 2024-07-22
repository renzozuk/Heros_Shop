/* class Address {
    constructor({id, building_name, street, house_number, neighborhood, city, state, country, zip_code}) {
        this.id = id;
        this.building_name = building_name;
        this.street = street;
        this.house_number = house_number;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zip_code = zip_code;
    }
} */

const path = "https://heros-shop-i-default-rtdb.firebaseio.com/";

const accountButtons = document.getElementById("account-buttons");

/* const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button"); */

document.addEventListener("DOMContentLoaded", getLoginStatus);

function getLoginStatus() {
    if(localStorage.getItem("currentUser")){
        const userInfoContent = document.createElement("p");

        setCurrentUserName(userInfoContent);

        const leftButton = document.createElement("div");
        leftButton.id = "left-button";
        
        leftButton.appendChild(userInfoContent);

        const exitButtonContent = document.createElement("ul");

        exitButtonContent.innerHTML = `<li><a target="_parent"><i class="fas fa-door-open" style="color: #ffffff;"></i> Sair</a></li>`;
        exitButtonContent.id = "exit-button";
        
        const rightButton = document.createElement("div");
        rightButton.id = "right-button";

        rightButton.appendChild(exitButtonContent);
        rightButton.onclick = function exit() {
            localStorage.setItem("currentUser", "");
            window.parent.location.href = `../${localStorage.getItem("lastPage")}`;
        }

        accountButtons.appendChild(leftButton);
        accountButtons.appendChild(rightButton);
    }else{
        const signupButtonContent = document.createElement("ul");
        
        signupButtonContent.innerHTML = `<li><a href="../06_UserAccount/06A_Signup/index.html" target="_parent"><i class="fas fa-user"></i> Criar Conta</a></li>`;

        const leftButton = document.createElement("div");
        leftButton.id = "left-button";

        leftButton.appendChild(signupButtonContent);

        const loginButtonContent = document.createElement("ul");

        loginButtonContent.innerHTML = `<li><a href="../06_UserAccount/06B_Login/index.html" target="_parent"><i class="fas fa-user"></i> Login</a></li>`;

        const rightButton = document.createElement("div");
        rightButton.id = "right-button";
        
        rightButton.appendChild(loginButtonContent);

        accountButtons.appendChild(leftButton);
        accountButtons.appendChild(rightButton);
    }
}

function setCurrentUserName(userInfoContent) {
    return fetch(`${path}user.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network answer was not ok.");
            }
            return response.json();
        })
        .then((users) => {
            userInfoContent.innerHTML = `Olá ${firstAndLastName(users[localStorage.getItem("currentUser")].name)}!`;
        });
}

function firstAndLastName(fullName) {
    const names = fullName.split(" ");

    if(names.length > 1){
        return names[0] + " " + names[names.length - 1];
    }else{
        return names[0];
    }
}