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

let paymentOption = -1;

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

        const chosenPaymentOptionTitle = document.createElement("div");
        chosenPaymentOptionTitle.className = "chosen-payment-option-title";
        const chosenPaymentOptionTitleText = document.createElement("p");
        chosenPaymentOptionTitleText.className = "chosen-payment-option-title-text";
        chosenPaymentOptionTitleText.innerHTML = "Escolha o método de pagamento de sua preferência.";

        const paymentContent = document.createElement("div");
        paymentContent.className = "payment-content";

        cardButton.appendChild(cardImage);
        bankSlipButton.appendChild(bankSlipImage);
        paymentOptionsButtons.appendChild(cardButton);
        paymentOptionsButtons.appendChild(bankSlipButton);
        paymentBox.appendChild(paymentOptionsTitle);
        paymentBox.appendChild(paymentOptionsButtons);
        chosenPaymentOptionTitle.appendChild(chosenPaymentOptionTitleText);
        paymentBox.appendChild(chosenPaymentOptionTitle);
        paymentBox.appendChild(paymentContent);
        outerPaymentBox.appendChild(paymentBox);
        purchaseDiv.appendChild(outerPaymentBox);

        cardButton.addEventListener("mouseover", function () {
            cardImage.style = "width: 76px; height: 54px;";
        });

        cardButton.addEventListener("mouseleave", function () {
            cardImage.style = "width: 72px; height: 50px;";
        });

        cardButton.addEventListener("click", function () {
            paymentOption = 0;

            chosenPaymentOptionTitleText.innerHTML = "Método de pagamento escolhido: cartão de crédito/débito.";
            paymentContent.innerHTML = "";

            const cardForm = document.createElement("form");

            const ownerNameBox = document.createElement("div");
            ownerNameBox.className = "card-box";
            ownerNameBox.style = "margin-top: 60px;";
            const ownerNameLabel = document.createElement("label");
            ownerNameLabel.className = "owner-name-label";
            ownerNameLabel.innerHTML = "Titular do cartão:";
            const ownerNameInput = document.createElement("input");
            ownerNameInput.className = "owner-name-input";
            ownerNameBox.appendChild(ownerNameLabel);
            ownerNameBox.appendChild(ownerNameInput);

            const cardNumberBox = document.createElement("div");
            cardNumberBox.className = "card-box";
            const cardNumberLabel = document.createElement("label");
            cardNumberLabel.className = "card-number-label";
            cardNumberLabel.innerHTML = "Número do cartão:";
            const cardNumberInput = document.createElement("input");
            cardNumberInput.className = "card-number-input";
            cardNumberInput.placeholder = "0000 0000 0000 0000";
            cardNumberBox.appendChild(cardNumberLabel);
            cardNumberBox.appendChild(cardNumberInput);

            cardNumberInput.addEventListener("input", function(e) {
                if(cardNumberInput.value.length == 13 || cardNumberInput.value.length == 16 || cardNumberInput.value.length == 19){
                    if(cardNumberInput.value.charAt(0) == "4" && isCardNumberValid(cardNumberInput.value)){
                        console.log("Valid Visa number.");
                    }else if(((parseInt(cardNumberInput.value.substring(0, 2)) >= 51 && parseInt(cardNumberInput.value.substring(0, 2)) <= 55) || (parseInt(cardNumberInput.value.substring(0, 4)) >= 2221 && parseInt(cardNumberInput.value.substring(0, 4)) <= 2720)) && isCardNumberValid(cardNumberInput.value)){
                        console.log("Valid MasterCard number.");
                    }else{
                        console.log("Card number not valid.");
                    }
                }
            });

            const expirationDateBox = document.createElement("div");
            expirationDateBox.className = "card-box";
            const expirationDateLabel = document.createElement("label");
            expirationDateLabel.className = "expiration-date-label";
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
            cvvLabel.className = "cvv-label";
            cvvLabel.innerHTML = "CVV:";
            const cvvInput = document.createElement("input");
            cvvInput.className = "cvv-input";
            cvvInput.placeholder = "000";
            cvvBox.appendChild(cvvLabel);
            cvvBox.appendChild(cvvInput);

            cardForm.appendChild(ownerNameBox);
            cardForm.appendChild(cardNumberBox);
            cardForm.appendChild(expirationDateBox);
            cardForm.appendChild(cvvBox);

            paymentContent.appendChild(cardForm);
        });

        bankSlipButton.addEventListener("mouseover", function () {
            bankSlipImage.style = "width: 64px; height: 54px;";
        });

        bankSlipButton.addEventListener("mouseleave", function () {
            bankSlipImage.style = "width: 60px; height: 50px;";
        });

        bankSlipButton.addEventListener("click", function () {
            paymentOption = 1;

            chosenPaymentOptionTitleText.innerHTML = "Método de pagamento escolhido: boleto bancário.";
            paymentContent.innerHTML = "";

            const boletoAdvice = document.createElement("p");
            boletoAdvice.style = "padding: 0px 60px; text-align: center;";
            boletoAdvice.innerHTML = "Método de págamento estará disponível em breve, por favor escolha um outro método de pagamento diferente.";

            paymentContent.appendChild(boletoAdvice);
        });

        const outerFreightBox = document.createElement("div");
        outerFreightBox.className = "outer-freight-box";

        const freightBox = document.createElement("div");
        freightBox.className = "freight-box";

        const freightOptionsTitle = document.createElement("div");
        freightOptionsTitle.className = "freight-options-title";
        freightOptionsTitle.innerHTML = `<h2 class="payment-options-title-text">Opções de frete</h2>`;

        const freightContent = document.createElement("div");
        freightContent.className = "freight-content";

        const addressForm = document.createElement("form");

        const streetBox = document.createElement("div");
        streetBox.className = "address-box street-box";
        streetBox.style = "margin-top: 60px;";
        const streetLabel = document.createElement("label");
        streetLabel.className = "address-label street-label";
        streetLabel.innerHTML = "Logradouro:";
        const streetInput = document.createElement("input");
        streetInput.className = "address-input street-input";
        streetBox.appendChild(streetLabel);
        streetBox.appendChild(streetInput);

        const houseNumberBox = document.createElement("div");
        houseNumberBox.className = "address-box house-number-box";
        const houseNumberLabel = document.createElement("label");
        houseNumberLabel.className = "address-label house-number-label";
        houseNumberLabel.innerHTML = "Número:";
        const houseNumberInput = document.createElement("input");
        houseNumberInput.className = "address-input house-number-input";
        houseNumberBox.appendChild(houseNumberLabel);
        houseNumberBox.appendChild(houseNumberInput);

        const buildingNameBox = document.createElement("div");
        buildingNameBox.className = "address-box building-name-box";
        const buildingNameLabel = document.createElement("label");
        buildingNameLabel.className = "address-label building-name-label";
        buildingNameLabel.innerHTML = "Complemento:";
        const buildingNameInput = document.createElement("input");
        buildingNameInput.className = "address-input building-name-input";
        buildingNameBox.appendChild(buildingNameLabel);
        buildingNameBox.appendChild(buildingNameInput);

        const neighborhoodBox = document.createElement("div");
        neighborhoodBox.className = "address-box neighborhood-box";
        const neighborhoodLabel = document.createElement("label");
        neighborhoodLabel.className = "address-label neighborhood-label";
        neighborhoodLabel.innerHTML = "Bairro:";
        const neighborhoodInput = document.createElement("input");
        neighborhoodInput.className = "address-input neighborhood-input";
        neighborhoodBox.appendChild(neighborhoodLabel);
        neighborhoodBox.appendChild(neighborhoodInput);

        const cityBox = document.createElement("div");
        cityBox.className = "address-box city-box";
        const cityLabel = document.createElement("label");
        cityLabel.className = "address-label city-label";
        cityLabel.innerHTML = "Cidade:";
        const cityInput = document.createElement("input");
        cityInput.className = "address-input city-input";
        cityBox.appendChild(cityLabel);
        cityBox.appendChild(cityInput);

        const stateBox = document.createElement("div");
        stateBox.className = "address-box state-box";
        const stateLabel = document.createElement("label");
        stateLabel.className = "address-label state-label";
        stateLabel.innerHTML = "Estado:";
        const stateInput = document.createElement("input");
        stateInput.className = "address-input state-input";
        stateBox.appendChild(stateLabel);
        stateBox.appendChild(stateInput);

        const zipCodeBox = document.createElement("div");
        zipCodeBox.className = "address-box zip-code-box";
        zipCodeBox.style = "margin-bottom: 60px;";
        const zipCodeLabel = document.createElement("label");
        zipCodeLabel.className = "address-label zip-code-label";
        zipCodeLabel.innerHTML = "CEP:";
        const zipCodeInput = document.createElement("input");
        zipCodeInput.className = "address-input zip-code-input";
        zipCodeBox.appendChild(zipCodeLabel);
        zipCodeBox.appendChild(zipCodeInput);

        zipCodeInput.addEventListener("input", function (e) {
            if (e.target.value.length >= 8) {
                fetch(`https://viacep.com.br/ws/${zipCodeInput.value}/json`)
                    .then((response) => response.json())
                    .then((cepData) => {
                        if (cepData.logradouro) {
                            streetInput.value = cepData.logradouro;
                        }

                        if (cepData.complemento) {
                            buildingNameInput.value = cepData.complemento;
                        }

                        if (cepData.bairro) {
                            neighborhoodInput.value = cepData.bairro;
                        }

                        if (cepData.localidade) {
                            cityInput.value = cepData.localidade;
                        }

                        if (cepData.uf) {
                            stateInput.value = cepData.uf;
                        }
                    });
            } else {
                streetInput.value = "";
                buildingNameInput.value = "";
                neighborhoodInput.value = "";
                cityInput.value = "";
                stateInput.value = "";
            }
        });

        const freightBoxBottom = document.createElement("div");
        freightBoxBottom.className = "freight-box-bottom";

        const freightOptionsButtons = document.createElement("div");
        freightOptionsButtons.className = "freight-options-buttons";

        const firstFreightOptionButton = document.createElement("div");
        firstFreightOptionButton.className = "first-freight-option-button";
        const firstFreightOptionTitle = document.createElement("p");
        firstFreightOptionTitle.className = "first-freight-option-title";
        firstFreightOptionTitle.innerHTML = `Transportadora "A mais rápida"`;
        const firstFreightOptionTime = document.createElement("p");
        firstFreightOptionTime.className = "first-freight-option-time";
        firstFreightOptionTime.innerHTML = "Tempo aproximado: x dias";
        const firstFreightOptionPrice = document.createElement("p");
        firstFreightOptionPrice.className = "first-freight-option-price";
        firstFreightOptionPrice.innerHTML = "R$ 00,00";
        firstFreightOptionButton.appendChild(firstFreightOptionTitle);
        firstFreightOptionButton.appendChild(firstFreightOptionTime);
        firstFreightOptionButton.appendChild(firstFreightOptionPrice);

        const secondFreightOptionButton = document.createElement("div");
        secondFreightOptionButton.className = "second-freight-option-button";
        const secondFreightOptionTitle = document.createElement("p");
        secondFreightOptionTitle.className = "second-freight-option-title";
        secondFreightOptionTitle.innerHTML = `Transportadora "A mais veloz"`;
        const secondFreightOptionTime = document.createElement("p");
        secondFreightOptionTime.className = "second-freight-option-time";
        secondFreightOptionTime.innerHTML = "Tempo aproximado: y dias";
        const secondFreightOptionPrice = document.createElement("p");
        secondFreightOptionPrice.className = "second-freight-option-price";
        secondFreightOptionPrice.innerHTML = "R$ 00,00";
        secondFreightOptionButton.appendChild(secondFreightOptionTitle);
        secondFreightOptionButton.appendChild(secondFreightOptionTime);
        secondFreightOptionButton.appendChild(secondFreightOptionPrice);

        const thirdFreightOptionButton = document.createElement("div");
        thirdFreightOptionButton.className = "third-freight-option-button";
        const thirdFreightOptionTitle = document.createElement("p");
        thirdFreightOptionTitle.className = "third-freight-option-title";
        thirdFreightOptionTitle.innerHTML = `Correios`;
        const thirdFreightOptionTime = document.createElement("p");
        thirdFreightOptionTime.className = "third-freight-option-time";
        thirdFreightOptionTime.innerHTML = "Tempo aproximado: z dias";
        const thirdFreightOptionPrice = document.createElement("p");
        thirdFreightOptionPrice.className = "third-freight-option-price";
        thirdFreightOptionPrice.innerHTML = "R$ 00,00";
        thirdFreightOptionButton.appendChild(thirdFreightOptionTitle);
        thirdFreightOptionButton.appendChild(thirdFreightOptionTime);
        thirdFreightOptionButton.appendChild(thirdFreightOptionPrice);

        const chosenFreightOptionTitle = document.createElement("div");
        chosenFreightOptionTitle.className = "chosen-freight-option-title";
        const chosenFreightOptionTitleText = document.createElement("p");
        chosenFreightOptionTitleText.className = "chosen-freight-option-title-text";
        chosenFreightOptionTitleText.innerHTML = "Escolha a opção de frete de sua preferência.";

        freightBox.appendChild(freightOptionsTitle);
        addressForm.appendChild(streetBox);
        addressForm.appendChild(houseNumberBox);
        addressForm.appendChild(buildingNameBox);
        addressForm.appendChild(neighborhoodBox);
        addressForm.appendChild(cityBox);
        addressForm.appendChild(stateBox);
        addressForm.appendChild(zipCodeBox);
        freightContent.appendChild(addressForm);
        freightBox.appendChild(freightContent);
        chosenFreightOptionTitle.appendChild(chosenFreightOptionTitleText);
        freightOptionsButtons.appendChild(firstFreightOptionButton);
        freightOptionsButtons.appendChild(secondFreightOptionButton);
        freightOptionsButtons.appendChild(thirdFreightOptionButton);
        freightBoxBottom.appendChild(freightOptionsButtons);
        freightBoxBottom.appendChild(chosenFreightOptionTitle);
        freightBox.appendChild(freightBoxBottom);
        outerFreightBox.appendChild(freightBox);
        purchaseDiv.appendChild(outerFreightBox);

        confirmationButtonBox.style = "height: fit-content;";
        confirmationButton.style.visibility = "visible";
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
