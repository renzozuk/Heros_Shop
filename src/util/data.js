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

class Review {
    constructor({ id, comment, date, order, stars }) {
        this.id = id;
        this.comment = comment;
        this.date = date;
        this.order = order;
        this.stars = stars;
    }
}

const path = "https://heros-shop-i-default-rtdb.firebaseio.com/";

function loadProducts(category) {
    return fetch(`${path}product.json`, {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network answer was not ok.");
            }
            return response.json();
        })
        .then((products) => {
            const productsList = [];

            for (let key in products) {
                if (products[key].category === category || !category) {
                    const product = new Product({
                        id: key,
                        name: products[key].name,
                        description: products[key].description,
                        price: products[key].price,
                        photo: products[key].photo,
                        category: products[key].category,
                        origin_address: products[key].origin_address,
                    });

                    productsList.push(product);
                }
            }

            return productsList;
        });
}

function loadSpecificProduct(productId) {
    return fetch(`${path}product.json`, {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network answer was not ok.");
            }
            return response.json();
        })
        .then((products) => {
            for (let key in products) {
                if (key === productId) {
                    const product = new Product({
                        id: key,
                        name: products[key].name,
                        description: products[key].description,
                        price: products[key].price,
                        photo: products[key].photo,
                        category: products[key].category,
                        origin_address: products[key].origin_address,
                    });

                    return product;
                }
            }
        });
}

function loadReviews(productId) {
    let reviewsList = [];

    fetch(`${path}review.json`, {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network answer was not ok.");
            }
            return response.json();
        })
        .then((reviews) => {
            for (let key in reviews) {
                reviewsList.push(
                    new Review({
                        id: key,
                        comment: reviews[key].comment,
                        date: reviews[key].date,
                        order: reviews[key].order,
                        stars: reviews[key].stars,
                    })
                );
            }

            return reviewsList;
        });
}

export { loadProducts, loadSpecificProduct, loadReviews };
