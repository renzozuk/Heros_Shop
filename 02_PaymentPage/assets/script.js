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

const path = "db-path-here";

const productDiv = document.querySelector(".product");

document.addEventListener("DOMContentLoaded", getCurrentProduct);

function getCurrentProduct() {
    fetchProduct()
        .then((product) => {
            loadProductInformation(product)
        })
        .catch((error) => {
            console.error("An error occured trying to load products list: ", error);
        });
}

function fetchProduct() {
    return fetch(`${path}product.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network answer was not ok.");
            }
            return response.json();
        })
        .then((products) => {
            for (let key in products) {
                if(key == localStorage.getItem("currentProduct")){
                    const product = new Product({
                        id: key,
                        name: products[key].name,
                        description: products[key].description,
                        price: products[key].price,
                        photo: products[key].photo,
                        category: products[key].category,
                        origin_address: products[key].origin_address
                    });

                    return product;
                }
            }
        });
}

function loadProductInformation(product) {
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

    productDiv.appendChild(image);
    productDiv.appendChild(name);
    productDiv.appendChild(description);
    productDiv.appendChild(price);
}

