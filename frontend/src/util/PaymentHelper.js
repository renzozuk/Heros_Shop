import { addOrder } from "./Data";

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

function confirmOrder(productId, userId) {
    let today = new Date(Date.now());
    let deliveryDate = new Date(Date.now());
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    const newOrder = new Order ({
        date_of_delivery: deliveryDate.toISOString().slice(0, 10),
        date_of_purchase: today.toISOString().slice(0, 10),
        payment_method: 0,
        product: productId,
        user: userId
    });

    addOrder(newOrder);
}

function getDigit(number) {
    if (number < 9) return number;
    return Math.floor(number / 10) + (number % 10);
}

function getSize(d) {
    let num = d.toString();
    return num.length;
}

function getPrefix(number, k) {
    if (getSize(number) > k) {
        let num = number.toString();
        return parseInt(num.substring(0, k));
    }
    return number;
}

function prefixMatched(number, d) {
    return getPrefix(number, getSize(d)) == d;
}

function sumOfDoubleEvenPlace(number) {
    let sum = 0;
    let num = number.toString();
    for (let i = getSize(number) - 2; i >= 0; i -= 2) sum += getDigit((num.charCodeAt(i) - "0".charCodeAt(0)) * 2);

    return sum;
}

function sumOfOddPlace(number) {
    let sum = 0;
    let num = number.toString();
    for (let i = getSize(number) - 1; i >= 0; i -= 2) sum += num.charCodeAt(i) - "0".charCodeAt(0);
    return sum;
}

function isCardNumberValid(number) {
    return getSize(number) >= 13 && getSize(number) <= 16 && (prefixMatched(number, 4) || prefixMatched(number, 5) || prefixMatched(number, 37) || prefixMatched(number, 6)) && (sumOfDoubleEvenPlace(number) + sumOfOddPlace(number)) % 10 == 0;
}

export { confirmOrder, isCardNumberValid };