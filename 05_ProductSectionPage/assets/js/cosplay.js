class Product {
    constructor({ id, name, description, price, photo, category, origin_address }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.photo = photo;
        this.category = category;
        this.origin_address = origin_address;
    }
}

const path = "https://heros-shop-i-default-rtdb.firebaseio.com/";

const productsContainer = document.getElementById("products-container");

document.addEventListener("DOMContentLoaded", lastPageMethod);
document.addEventListener("DOMContentLoaded", listProducts);

function lastPageMethod() {
    localStorage.setItem("lastPage", "05_ProductSectionPage/05B_Cosplay/index.html");
}

function listProducts() {
    fetchProducts()
        .then((products) => {
            renderProducts(products)
        })
        .catch((error) => {
            console.error("An error occured trying to load products list: ", error);
        });
}

function fetchProducts() {
    return fetch(`${path}product.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network answer was not ok.");
            }
            return response.json();
        })
        .then((products) => {
            const productsList = [];

            for (let key in products) {
                const product = new Product({
                    id: key,
                    name: products[key].name,
                    description: products[key].description,
                    price: products[key].price,
                    photo: products[key].photo,
                    category: products[key].category,
                    origin_address: products[key].origin_address
                });

                productsList.push(product);
            }

            return productsList;
        });
}

function renderProducts(products) {
    productsContainer.innerHTML = "";

    products.forEach((product) => {
        if(product.category === "Cosplay"){
            const productDiv = createProductDiv(product);
            productsContainer.appendChild(productDiv);
        }
    })
}

function createProductDiv(product) {
    const productDiv = document.createElement("div");
    productDiv.className = `product`;
    productDiv.id = `${product.id}`;

    const image = document.createElement("div");
    image.className = `image`;
    image.innerHTML = `<img src="${product.photo}" />`

    const name = document.createElement("h3");
    name.innerHTML = `${product.name}`

    const description = document.createElement("p");
    description.className = `description`;
    description.innerHTML = `${product.description}`

    const price = document.createElement("p");
    price.className = `price`;
    price.innerHTML = `${product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`

    const buttons = document.createElement("div");
    buttons.className = `buttons`;
    buttons.innerHTML = `<a class="buy-button" onclick="redirectToBuyPage(this)"><button>Comprar</button></a>
                        <a href="#"><button>Ver Detalhes</button></a>`;

    productDiv.appendChild(image);
    productDiv.appendChild(name);
    productDiv.appendChild(description);
    productDiv.appendChild(price);
    productDiv.appendChild(buttons);

    return productDiv;
}

function exportId(button) {
    localStorage.setItem("currentProduct", button.parentNode.parentNode.id);
}

function redirectToBuyPage(button) {
    exportId(button);
    window.location.href = "../../02_PaymentPage/index.html";
}

function redirectToReviewPage(button) {
    exportId(button);
    window.location.href = "../../04_ReviewPage/index.html";
}