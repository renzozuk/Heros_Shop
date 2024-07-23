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

class User {
    constructor({ id, name, cpf, default_address, photo, phone_number }) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.default_address = default_address;
        this.photo = photo;
        this.phone_number = phone_number;
    }
}

class Address {
    constructor({ id, building_name, city, country, house_number, neighborhood, state, street, zip_code }) {
        this.id = id;
        this.building_name = building_name;
        this.city = city;
        this.country = country;
        this.house_number = house_number;
        this.neighborhood = neighborhood;
        this.state = state;
        this.street = street;
        this.zip_code = zip_code;
    }
}

const path = "https://heros-shop-i-default-rtdb.firebaseio.com/";

const auth = firebase.auth();

function getUser() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                reject(new Error('Usuário não encontrado'));
            }
        });
    });
}

async function fetchUserData(user) {
    try {
        const response = await fetch(`${path}/user/${user.uid}.json`);
        const data = await response.json();
        if (data) {
            return new User(data);
        } else {
            throw new Error('Usuário não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        throw error;
    }
}

async function fetchAddressData(addressId) {
    try {
        const response = await fetch(`${path}/address/${addressId}.json`);
        const data = await response.json();

        if (data) {
            return new Address(data);
        } else {
            throw new Error('Endereço não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        throw error;
    }
}

function fillFormWithUserData(user_data, auth_user, default_address) {
    document.getElementById('name').value = user_data.name;
    document.getElementById('email').value = auth_user.email;
    document.getElementById('cpf').value = user_data.cpf;
    document.getElementById('telefone').value = user_data.phone_number;
    document.getElementById('foto').value = user_data.photo;

    document.getElementById('building_name').value = default_address.building_name;
    document.getElementById('house_number').value = default_address.house_number;
    document.getElementById('street').value = default_address.street;
    document.getElementById('neighborhood').value = default_address.neighborhood;
    document.getElementById('city').value = default_address.city;
    document.getElementById('state').value = default_address.state;
    document.getElementById('country').value = default_address.country;
    document.getElementById('zip_code').value = default_address.zip_code;
}

window.addEventListener('load', async () => {
    const auth_user = await getUser();
    if (auth_user) {
        try {
            const user_data = await fetchUserData(auth_user);
            const default_address = await fetchAddressData(user_data.default_address);
            if (user_data) {
                fillFormWithUserData(user_data, auth_user, default_address);
            } else {
                console.error("Usuário não encontrado no Firebase.");
            }
        } catch (error) {
            console.error('Erro ao carregar os dados do usuário:', error);
        }
    } else {
        console.warn("Nenhum ID de usuário encontrado no localStorage.");
    }
});

document.getElementById('submit-button').addEventListener('click', async (event) => {

    const password_input = document.getElementById('old_password');
    if (!password_input.value) {
        alert('Por favor, insira sua senha para confirmar as alterações.');
        return;
    }

    const auth_user = await getUser();
    const user_data = await fetchUserData(auth_user);

    const user_email = auth_user.email;
    const input_email = document.getElementById('email').value;

    const credential = firebase.auth.EmailAuthProvider.credential(user_email, password_input.value);
    await auth_user.reauthenticateWithCredential(credential);

    const input_new_password = document.getElementById('new_password').value;
    const input_confirm_password = document.getElementById('confirm_password').value;

    if (user_email != input_email) {
        await auth_user.updateEmail(input_email);
    }

    if (input_new_password.length > 0 && input_confirm_password.length > 0) {
        if (input_new_password === input_confirm_password) {
            await auth_user.updatePassword(input_new_password);
        }
        else {
            alert("A nova senha não pôde ser confirmada. Tente novamente.");
            return;
        }
    }
    else if (input_new_password != input_confirm_password) {
        alert("A nova senha não pôde ser confirmada. Tente novamente.");
        return;
    }

    const updatedUserData = {
        name: document.getElementById('name').value,
        cpf: document.getElementById('cpf').value,
        phone_number: document.getElementById('telefone').value,
        photo: document.getElementById('foto').value,
        default_address: user_data.default_address
    };

    const updatedAddressData = {
        building_name: document.getElementById('building_name').value,
        house_number: document.getElementById('house_number').value,
        street: document.getElementById('street').value,
        neighborhood: document.getElementById('neighborhood').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        country: document.getElementById('country').value,
        zip_code: document.getElementById('zip_code').value
    };

    if (auth_user) {

        try {
            await fetch(`${path}/user/${auth_user.uid}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserData)
            });

            await fetch(`${path}/address/${updatedUserData.default_address}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAddressData)
            });


            location.reload();
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
        }
    } else {
        console.warn("Nenhum usuário autenticado encontrado.");
    }
});

const cepInput = document.getElementById('zip_code');
cepInput.addEventListener('blur', () => {
    const cep = cepInput.value.replace(/\D/g, '');
    if (cep.length === 8) {
        buscarEndereco(cep);
    } else {
        alert('CEP inválido!');
    }
});

async function buscarEndereco(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            throw new Error('CEP não encontrado');
        }

        fillFormWithAddressData(data);
    } catch (error) {
        console.error('Erro ao buscar endereço:', error);
        alert('Erro ao buscar endereço. Verifique o CEP e tente novamente.');
    }
}

function fillFormWithAddressData(data) {
    document.getElementById('street').value = data.logradouro;
    document.getElementById('neighborhood').value = data.bairro;
    document.getElementById('city').value = data.localidade;
    document.getElementById('state').value = data.uf;
}

document.getElementById('delete-button').addEventListener('click', async () => {
    const password_input = document.getElementById('old_password').value;
    if (password_input == 0) {
        alert('Por favor, insira sua senha para confirmar as alterações.');
        return;
    }

    if (confirm('Tem certeza que deseja apagar sua conta permanentemente?')) {
        const auth_user = await getUser();
        try {
            const credential = firebase.auth.EmailAuthProvider.credential(auth_user.email, password_input);
            await auth_user.reauthenticateWithCredential(credential);
        }
        catch (error) {
            alert("Senha incorreta, tente novamente.");
            return;
        }
        const user_data = await fetchUserData(auth_user);
        const user_uid = auth_user.uid;
        const address_uid = user_data.default_address;
        console.log("Here: ", address_uid);
        try {
            await auth_user.delete();

            const addressURL = `${path}/address/${address_uid}.json`;
            await fetch(addressURL, { method: 'DELETE' });

            const userURL = `${path}/user/${user_uid}.json`;
            await fetch(userURL, { method: 'DELETE' });


            firebase.auth().signOut()
                .then(() => {
                    localStorage.clear();
                    window.location.href = '../../01_Homepage/index.html';
                })
                .catch((error) => {
                    console.error("Erro ao fazer logout:", error);
                });

        } catch (error) {
            console.error('Erro ao apagar a conta:', error);
        }
    }
});
