class Order {
    constructor({ id, date_of_delivery, date_of_purchase, destination_address, payment_method, product, user }) {
        this.id = id;
        this.date_of_delivery = date_of_delivery;
        this.date_of_purchase = date_of_purchase;
        this.destination_address = destination_address;
        this.payment_method = payment_method;
        this.product = product;
        this.user = user;
    }
}

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
    constructor({ id, userPhoto, userName, comment, date, order, stars }) {
        this.id = id;
        this.userPhoto = userPhoto;
        this.userName = userName;
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

function getAddressFromProduct(productId) {
    fetch(`${path}product.json`)
        .then((response) => response.json())
        .then((products) => {
            let a = fetch(`${path}address.json`)
                .then((response) => response.json())
                .then((addresses) => {
                    console.log(products[productId]);
                    /* return `Origem do produto: ${addresses[products[localStorage.getItem("currentProduct")].origin_address].city} - ${addresses[products[localStorage.getItem("currentProduct")].origin_address].state}`; */
                });
        });
}

async function loadReviews(productId) {
    const reviewsList = [];

    return fetch(`${path}review.json`, {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network answer was not ok.");
            }
            return response.json();
        })
        .then((reviews) => {
            const promises = [];

            for (let key in reviews) {
                promises.push(
                    fetch(`${path}order/${reviews[key].order}.json`, {
                        method: "GET",
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Network answer was not ok.");
                            }
                            return response.json();
                        })
                        .then(async (order) => {
                            await fetch(`${path}user/${order.user}.json`, {
                                method: "GET",
                            })
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error("Network answer was not ok.");
                                    }
                                    return response.json();
                                })
                                .then((user) => {
                                    if (order.product === productId) {
                                        const review = new Review({
                                            id: key,
                                            userPhoto: user.photo,
                                            userName: user.name,
                                            comment: reviews[key].comment,
                                            date: reviews[key].date,
                                            order: reviews[key].order,
                                            stars: reviews[key].stars,
                                        });

                                        reviewsList.push(review);
                                    }
                                });
                        })
                );
            }

            return Promise.all(promises).then(() => reviewsList);
        });
}

/* function getReviewsAverage(reviews) {} */

function addOrder(orderData) {
    return fetch(path + "order.json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Resposta de rede não foi ok");
        }
    });
}

export { loadProducts, loadSpecificProduct, getAddressFromProduct, loadReviews,/*  getReviewsAverage, */ addOrder };
