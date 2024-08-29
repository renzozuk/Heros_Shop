const path = "https://heros-shop-i-default-rtdb.firebaseio.com/";


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

function loadUserOrders(userId) {
    return fetch(`${path}order.json`, {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network answer was not ok.");
            }
            return response.json();
        })
        .then((orders) => {

            const userOrders = [];
            for (let key in orders) {
                if (orders[key].user === userId || !userId) {
                    const order = new Order({
                        id: key,
                        date_of_delivery: orders[key].date_of_delivery,
                        date_of_purchase: orders[key].date_of_purchase,
                        destination_address: orders[key].destination_address,
                        payment_method: orders[key].payment_method,
                        product: orders[key].product,
                        user: orders[key].user,
                    });
                    userOrders.push(order);
                }
            }

            return userOrders;
        });
}

async function loadOrdersProducts(orders) {
    return await fetch(`${path}product.json`, {
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

            for (let orderKey in orders) {
                for (let key in products) {
                    if (orders[orderKey].product === key) {
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
            }

            return productsList;
        });
}

export {loadUserOrders, loadOrdersProducts};