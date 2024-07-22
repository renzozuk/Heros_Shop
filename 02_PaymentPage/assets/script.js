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

const productDiv = document.querySelector(".product");
const purchaseDiv = document.querySelector(".purchase");
const confirmationButtonBox = document.querySelector(".confirmation-button-box");
const confirmationButton = document.querySelector(".confirmation-button");

document.addEventListener("DOMContentLoaded", lastPageMethod);
document.addEventListener("DOMContentLoaded", getCurrentUser);
document.addEventListener("DOMContentLoaded", getCurrentProduct);

function lastPageMethod() {
    localStorage.setItem("lastPage", "02_PaymentPage/index.html");
}

function getCurrentUser() {
    if (localStorage.getItem("currentUser")) {
        const outerPaymentBox = document.createElement("div");
        outerPaymentBox.className = "outer-payment-box";

        const paymentBox = document.createElement("div");
        paymentBox.className = "payment-box";

        const paymentOptionsTitle = document.createElement("div");
        paymentOptionsTitle.className = "payment-options-title";
        paymentOptionsTitle.innerHTML = `<h2 class="payment-options-title-text">Opções de pagamento</h2>`;

        const paymentOptionsButtons = document.createElement("div");
        paymentOptionsButtons.className = "payment-options-buttons";

        const cardButton = document.createElement("div");
        cardButton.className = "card-button";

        const cardImage = document.createElement("img");
        cardImage.className = "card-image";
        cardImage.src = "assets/images/orange_card.png";

        const bankSlipButton = document.createElement("div");
        bankSlipButton.className = "bank-slip-button";

        const bankSlipImage = document.createElement("img");
        bankSlipImage.className = "bank-slip-image";
        bankSlipImage.src = "assets/images/orange_bank_slip.png";

        const choseOptionTitle = document.createElement("div");
        choseOptionTitle.className = "chose-option-title";

        const choseOptionTitleText = document.createElement("p");
        choseOptionTitleText.className = "chose-option-title-text";
        choseOptionTitleText.innerHTML = "Escolha o método de pagamento de sua preferência.";

        const paymentContent = document.createElement("div");
        paymentContent.className = "payment-content";

        confirmationButtonBox.style = "height: fit-content;";
        confirmationButton.style.visibility = "visible";

        cardButton.appendChild(cardImage);
        bankSlipButton.appendChild(bankSlipImage);
        paymentOptionsButtons.appendChild(cardButton);
        paymentOptionsButtons.appendChild(bankSlipButton);
        paymentBox.appendChild(paymentOptionsTitle);
        paymentBox.appendChild(paymentOptionsButtons);
        choseOptionTitle.appendChild(choseOptionTitleText);
        paymentBox.appendChild(choseOptionTitle);
        paymentBox.appendChild(paymentContent);
        outerPaymentBox.appendChild(paymentBox);
        purchaseDiv.appendChild(outerPaymentBox);

        cardButton.addEventListener("mouseover", function () {
            cardImage.style = "width: 74px; height: 52px;";
        });

        cardButton.addEventListener("mouseleave", function () {
            cardImage.style = "width: 72px; height: 50px;";
        });

        cardButton.addEventListener("click", function () {
            choseOptionTitleText.innerHTML = "Método de pagamento escolhido: cartão de crédito/débito.";
            paymentContent.innerHTML = "";

            const cardForm = document.createElement("form");

            const ownerNameBox = document.createElement("div");
            ownerNameBox.className = "card-box";
            ownerNameBox.style = "margin-top: 60px;";
            const ownerNameLabel = document.createElement("label");
            ownerNameLabel.innerHTML = "Titular do cartão:";
            const ownerNameInput = document.createElement("input");
            ownerNameInput.className = "owner-name-input";
            ownerNameBox.appendChild(ownerNameLabel);
            ownerNameBox.appendChild(ownerNameInput);

            const cardNumberBox = document.createElement("div");
            cardNumberBox.className = "card-box";
            const cardNumberLabel = document.createElement("label");
            cardNumberLabel.innerHTML = "Número do cartão:";
            const cardNumberInput = document.createElement("input");
            cardNumberInput.className = "card-name-input";
            cardNumberBox.appendChild(cardNumberLabel);
            cardNumberBox.appendChild(cardNumberInput);

            const expirationDateBox = document.createElement("div");
            expirationDateBox.className = "card-box";
            const expirationDateLabel = document.createElement("label");
            expirationDateLabel.innerHTML = "Data de validade:";
            const expirationDateInput = document.createElement("input");
            expirationDateInput.className = "expiration-date-input";
            expirationDateInput.type = "month";
            expirationDateInput.min = "2024-07";
            expirationDateInput.max = "2040-12";
            expirationDateInput.value = "2024-08";
            expirationDateBox.appendChild(expirationDateLabel);
            expirationDateBox.appendChild(expirationDateInput);

            const cvvBox = document.createElement("div");
            cvvBox.className = "card-box";
            cvvBox.style = "margin-bottom: 60px;";
            const cvvLabel = document.createElement("label");
            cvvLabel.innerHTML = "CVV:";
            const cvvInput = document.createElement("input");
            cvvInput.className = "cvv-input";
            cvvBox.appendChild(cvvLabel);
            cvvBox.appendChild(cvvInput);

            cardForm.appendChild(ownerNameBox);
            cardForm.appendChild(cardNumberBox);
            cardForm.appendChild(expirationDateBox);
            cardForm.appendChild(cvvBox);

            paymentContent.appendChild(cardForm);
        });

        bankSlipButton.addEventListener("mouseover", function () {
            bankSlipImage.style = "width: 62px; height: 52px;";
        });

        bankSlipButton.addEventListener("mouseleave", function () {
            bankSlipImage.style = "width: 60px; height: 50px;";
        });

        bankSlipButton.addEventListener("click", function () {
            choseOptionTitleText.innerHTML = "Método de pagamento escolhido: boleto bancário.";
            paymentContent.innerHTML = "";

            const boletoAdvice = document.createElement("p");
            boletoAdvice.style = "padding: 0px 60px; text-align: center;";
            boletoAdvice.innerHTML = "Método de págamento estará disponível em breve, por favor escolha um outro método de pagamento diferente.";

            paymentContent.appendChild(boletoAdvice);
        });
    } else {
        const noUserText = document.createElement("p");
        noUserText.className = "no-user-text";
        noUserText.innerHTML = "Para continuar com a compra, você deve estar logado.";
        purchaseDiv.appendChild(noUserText);
        confirmationButtonBox.style.height = 0;
        confirmationButton.style.visibility = "hidden";
    }
}

function getCurrentProduct() {
    fetchProduct()
        .then((product) => {
            loadProductInformation(product);
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
            return new Product({
                id: localStorage.getItem("currentProduct"),
                name: products[localStorage.getItem("currentProduct")].name,
                description: products[localStorage.getItem("currentProduct")].description,
                price: products[localStorage.getItem("currentProduct")].price,
                photo: products[localStorage.getItem("currentProduct")].photo,
                category: products[localStorage.getItem("currentProduct")].category,
                origin_address: products[localStorage.getItem("currentProduct")].origin_address,
            });
        });
}

function loadProductInformation(product) {
    productDiv.id = `${product.id}`;

    const image = document.createElement("div");
    image.className = `image`;
    const photo = document.createElement("img");
    photo.className = "photo";
    photo.src = `${product.photo}`;
    image.appendChild(photo);

    const name = document.createElement("h3");
    name.innerHTML = `${product.name}`;

    const description = document.createElement("p");
    description.className = `description`;
    description.innerHTML = `${product.description}`;

    const price = document.createElement("p");
    price.className = `price`;
    price.innerHTML = `${product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;

    const productInfo = document.createElement("div");
    productInfo.className = "product-info";

    productDiv.appendChild(image);
    productInfo.appendChild(name);
    productInfo.appendChild(description);
    productInfo.appendChild(price);
    productDiv.appendChild(productInfo);
}
