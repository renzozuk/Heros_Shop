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

const path = "https://heros-shop-i-default-rtdb.firebaseio.com/";

const productDiv = document.querySelector(".product");
const purchaseDiv = document.querySelector(".purchase");
const confirmationButtonBox = document.querySelector(".confirmation-button-box");
const confirmationButton = document.querySelector(".confirmation-button");

let isFreightPriceCalculated = false;

let paymentOption = -1;
let freightOption = -1;

let pp;

let t1p;
let t2p;
let cp;
let t1t;
let t2t;
let ct;

document.addEventListener("DOMContentLoaded", lastPageMethod);
document.addEventListener("DOMContentLoaded", getCurrentUser);
document.addEventListener("DOMContentLoaded", getCurrentProduct);

let originPlacePromise = fetch(`${path}product.json`)
    .then((response) => response.json())
    .then((products) => {
        let a = fetch(`${path}address.json`)
            .then((response) => response.json())
            .then((addresses) => {
                let b = fetch(`https://nominatim.openstreetmap.org/search?format=json&street=${addresses[products[localStorage.getItem("currentProduct")].origin_address].street}&city=${addresses[products[localStorage.getItem("currentProduct")].origin_address].city}&state=${addresses[products[localStorage.getItem("currentProduct")].origin_address].state}&country=Brazil`)
                    .then((response) => response.json())
                    .then((response) => {
                        return [parseFloat(response[0].lat), parseFloat(response[0].lon)];
                    });

                return b;
            });

        return a;
    });

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
            const cardNumberValidationBox = document.createElement("div");
            cardNumberValidationBox.className = "card-number-validation-box";
            const cardNumberInput = document.createElement("input");
            cardNumberInput.className = "card-number-input";
            cardNumberInput.placeholder = "0000 0000 0000 0000";
            const cardNumberBrand = document.createElement("img");
            cardNumberBrand.style = "width: 80px; height: 35px; visibility: hidden;";
            cardNumberValidationBox.appendChild(cardNumberInput);
            cardNumberValidationBox.appendChild(cardNumberBrand);
            cardNumberBox.appendChild(cardNumberLabel);
            cardNumberValidationBox.appendChild(cardNumberInput);
            cardNumberValidationBox.appendChild(cardNumberBrand);
            cardNumberBox.appendChild(cardNumberValidationBox);

            cardNumberInput.addEventListener("input", function () {
                if (cardNumberInput.value.length == 13 || cardNumberInput.value.length == 16 || cardNumberInput.value.length == 19) {
                    if (cardNumberInput.value.charAt(0) == "4" && isCardNumberValid(cardNumberInput.value)) {
                        cardNumberBrand.style.visibility = "visible";
                        cardNumberBrand.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1024px-Visa_Inc._logo.svg.png";
                    } else if (((parseInt(cardNumberInput.value.substring(0, 2)) >= 51 && parseInt(cardNumberInput.value.substring(0, 2)) <= 55) || (parseInt(cardNumberInput.value.substring(0, 4)) >= 2221 && parseInt(cardNumberInput.value.substring(0, 4)) <= 2720)) && isCardNumberValid(cardNumberInput.value)) {
                        cardNumberBrand.style.visibility = "visible";
                        cardNumberBrand.src = "https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo.png";
                    } else {
                        cardNumberBrand.style.visibility = "hidden";
                        console.log("Card number not valid.");
                        cardNumberBrand.src = "";
                    }
                } else {
                    cardNumberBrand.style.visibility = "hidden";
                    cardNumberBrand.src = "";
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

            confirmationButton.addEventListener("click", function () {
                if (paymentOption == 0) {
                    let totalPrice = pp;

                    let today = new Date(Date.now());
                    let deliveryDate = new Date(Date.now());

                    if (freightOption == 1) {
                        totalPrice += t1p;
                        deliveryDate.setDate(deliveryDate.getDate() + t1t);
                    } else if (freightOption == 2) {
                        totalPrice += t2p;
                        deliveryDate.setDate(deliveryDate.getDate() + t2t);
                    } else if (freightOption == 3) {
                        totalPrice += cp;
                        deliveryDate.setDate(deliveryDate.getDate() + ct);
                    } else {
                        window.alert("Por favor, selecione uma opção de frete.");
                        return;
                    }

                    if (!ownerNameInput.value || !cardNumberInput.value || !expirationDateInput.value || !cvvInput.value) {
                        window.alert("Preencha todos os campos de pagamento.");
                    } else if (!isCardNumberValid(cardNumberInput.value)) {
                        window.alert("Cartão de crédito invalido.");
                    } else {
                        const newOrder = new Order ({
                            date_of_delivery: deliveryDate.toISOString().slice(0, 10),
                            date_of_purchase: today.toISOString().slice(0, 10),
                            payment_method: 0,
                            product: localStorage.getItem("currentProduct"),
                            user: localStorage.getItem("currentUser")
                        });

                        addOrder(newOrder);
                    }
                } else if (paymentOption == 1) {
                    window.alert("Método de pagamento ainda não está disponível. Por favor selecione outro.");
                } else {
                    window.alert("Por favor, selecione um método de pagamento.");
                }
            });
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

        const deliveryForm = document.createElement("form");
        deliveryForm.style = "margin: 40px 60px 20px;";

        const defaultAddressOptionBox = document.createElement("div");
        defaultAddressOptionBox.className = "address-option-box";
        const defaultAddressOptionInput = document.createElement("input");
        defaultAddressOptionInput.type = "radio";
        defaultAddressOptionInput.name = "address-option";
        defaultAddressOptionInput.id = "default-address-option-input";
        defaultAddressOptionInput.value = "default-address-option-input";
        const defaultAddressOptionLabel = document.createElement("label");
        defaultAddressOptionLabel.id = "default-address-option-label";
        defaultAddressOptionLabel.innerHTML = "Endereço padrão: ";
        defaultAddressOptionLabel.for = defaultAddressOptionInput.id;

        const otherAddressOptionBox = document.createElement("div");
        otherAddressOptionBox.className = "address-option-box";
        const otherAddressOptionInput = document.createElement("input");
        otherAddressOptionInput.type = "radio";
        otherAddressOptionInput.name = "address-option";
        otherAddressOptionInput.id = "other-address-option-input";
        otherAddressOptionInput.value = "other-address-option-input";
        otherAddressOptionInput.checked = true;
        const otherAddressOptionLabel = document.createElement("label");
        otherAddressOptionLabel.id = "other-address-option-label";
        otherAddressOptionLabel.innerHTML = "Outro endereço:";
        otherAddressOptionLabel.for = otherAddressOptionInput.id;

        const addressForm = document.createElement("form");
        addressForm.className = "address-form";

        const streetBox = document.createElement("div");
        streetBox.className = "address-box street-box";
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
        /* zipCodeBox.style = "margin-bottom: 60px;"; */
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

        const calculateFreightBox = document.createElement("div");
        calculateFreightBox.className = "calculate-freight-box";
        const calculateFreightButton = document.createElement("button");
        calculateFreightButton.className = "calculate-freight-button";
        calculateFreightButton.innerHTML = "Calcular frete";
        calculateFreightBox.appendChild(calculateFreightButton);

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
        firstFreightOptionTime.innerHTML = "Tempo aproximado:";
        const firstFreightOptionPrice = document.createElement("p");
        firstFreightOptionPrice.className = "first-freight-option-price";
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
        secondFreightOptionTime.innerHTML = "Tempo aproximado:";
        const secondFreightOptionPrice = document.createElement("p");
        secondFreightOptionPrice.className = "second-freight-option-price";
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
        thirdFreightOptionTime.innerHTML = "Tempo aproximado:";
        const thirdFreightOptionPrice = document.createElement("p");
        thirdFreightOptionPrice.className = "third-freight-option-price";
        thirdFreightOptionButton.appendChild(thirdFreightOptionTitle);
        thirdFreightOptionButton.appendChild(thirdFreightOptionTime);
        thirdFreightOptionButton.appendChild(thirdFreightOptionPrice);

        const chosenFreightOptionTitle = document.createElement("div");
        chosenFreightOptionTitle.className = "chosen-freight-option-title";
        const chosenFreightOptionTitleText = document.createElement("p");
        chosenFreightOptionTitleText.className = "chosen-freight-option-title-text";
        chosenFreightOptionTitleText.innerHTML = "Escolha a opção de frete de sua preferência.";
        chosenFreightOptionTitle.appendChild(chosenFreightOptionTitleText);

        freightBox.appendChild(freightOptionsTitle);
        defaultAddressOptionBox.appendChild(defaultAddressOptionInput);
        defaultAddressOptionBox.appendChild(defaultAddressOptionLabel);
        otherAddressOptionBox.appendChild(otherAddressOptionInput);
        otherAddressOptionBox.appendChild(otherAddressOptionLabel);
        deliveryForm.appendChild(defaultAddressOptionBox);
        deliveryForm.appendChild(otherAddressOptionBox);
        freightContent.appendChild(deliveryForm);
        addressForm.appendChild(streetBox);
        addressForm.appendChild(houseNumberBox);
        addressForm.appendChild(buildingNameBox);
        addressForm.appendChild(neighborhoodBox);
        addressForm.appendChild(cityBox);
        addressForm.appendChild(stateBox);
        addressForm.appendChild(zipCodeBox);
        freightContent.appendChild(addressForm);
        freightContent.appendChild(calculateFreightBox);
        freightBox.appendChild(freightContent);
        freightOptionsButtons.appendChild(firstFreightOptionButton);
        freightOptionsButtons.appendChild(secondFreightOptionButton);
        freightOptionsButtons.appendChild(thirdFreightOptionButton);
        freightBoxBottom.appendChild(freightOptionsButtons);
        freightBoxBottom.appendChild(chosenFreightOptionTitle);
        freightBox.appendChild(freightBoxBottom);
        outerFreightBox.appendChild(freightBox);
        purchaseDiv.appendChild(outerFreightBox);

        loadCurrentAddressFromCurrentUser(defaultAddressOptionLabel);

        confirmationButtonBox.style = "height: fit-content;";
        confirmationButton.style.visibility = "visible";

        firstFreightOptionButton.addEventListener("click", function () {
            secondFreightOptionButton.style.backgroundColor = "#dedede";
            thirdFreightOptionButton.style.backgroundColor = "#dedede";

            if (isFreightPriceCalculated) {
                firstFreightOptionButton.style.backgroundColor = "#888888";
                freightOption = 1;
                chosenFreightOptionTitleText.innerHTML = `Opção escolhida: Transportadora "A mais rápida"`;
            }
        });

        secondFreightOptionButton.addEventListener("click", function () {
            firstFreightOptionButton.style.backgroundColor = "#dedede";
            thirdFreightOptionButton.style.backgroundColor = "#dedede";

            if (isFreightPriceCalculated) {
                secondFreightOptionButton.style.backgroundColor = "#888888";
                freightOption = 2;
                chosenFreightOptionTitleText.innerHTML = `Opção escolhida: Transportadora "A mais veloz"`;
            }
        });

        thirdFreightOptionButton.addEventListener("click", function () {
            firstFreightOptionButton.style.backgroundColor = "#dedede";
            secondFreightOptionButton.style.backgroundColor = "#dedede";

            if (isFreightPriceCalculated) {
                thirdFreightOptionButton.style.backgroundColor = "#888888";
                freightOption = 3;
                chosenFreightOptionTitleText.innerHTML = `Opção escolhida: Correios`;
            }
        });

        defaultAddressOptionInput.addEventListener("change", function () {
            freightContent.removeChild(addressForm);
            freightContent.removeChild(calculateFreightBox);

            deliveryForm.style = "margin: 40px 60px 40px;";

            let destinationPlacePromise = fetch(`${path}user.json`)
                .then((response) => response.json())
                .then((users) => {
                    let a = fetch(`${path}address.json`)
                        .then((response) => response.json())
                        .then((addresses) => {
                            let b = fetch(`https://nominatim.openstreetmap.org/search?format=json&street=${addresses[users[localStorage.getItem("currentUser")].default_address].street}&city=${addresses[users[localStorage.getItem("currentUser")].default_address].city}&state=${addresses[users[localStorage.getItem("currentUser")].default_address].state}&country=Brazil`)
                                .then((response) => response.json())
                                .then((response) => {
                                    return [parseFloat(response[0].lat), parseFloat(response[0].lon)];
                                });

                            return b;
                        });

                    return a;
                });

            let finalPromise = Promise.all([originPlacePromise, destinationPlacePromise]).then(([result1, result2]) => {
                return [result1, result2];
            });

            finalPromise
                .then((result) => {
                    fetch(`http://router.project-osrm.org/route/v1/driving/${result[0][1]},${result[0][0]};${result[1][1]},${result[1][0]}?overview=false`)
                        .then((response) => response.json())
                        .then((response) => {
                            let correiosTimeMultiplierParameter = 5.25;

                            let transDuration1 = (response.routes[0].duration / 60 / 60) * (correiosTimeMultiplierParameter / 2.25);
                            let transDuration2 = (response.routes[0].duration / 60 / 60) * (correiosTimeMultiplierParameter / 1.75);
                            let correiosDuration = (response.routes[0].duration / 60 / 60) * correiosTimeMultiplierParameter;

                            let correiosCostDivisorParameter = 172000;

                            let transCost1 = 22.0;
                            let transCost2 = 22.0;
                            let correiosCost = 22.0;

                            transCost1 += response.routes[0].distance / (correiosCostDivisorParameter / 2.25);
                            transCost2 += response.routes[0].distance / (correiosCostDivisorParameter / 1.75);
                            correiosCost += response.routes[0].distance / correiosCostDivisorParameter;

                            let boxCost = 8.4;

                            transCost1 += boxCost;
                            transCost2 += boxCost;
                            correiosCost += boxCost;

                            if (transDuration1 < 23.0) {
                                firstFreightOptionTime.innerHTML = `Tempo de entrega aproximado: 1 dia útil.`;
                                firstFreightOptionPrice.innerHTML = `Valor: ${transCost1.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                t1t = 1;
                            } else if (transDuration1 < 47.0) {
                                firstFreightOptionTime.innerHTML = `Tempo de entrega aproximado: 2 dias úteis.`;
                                firstFreightOptionPrice.innerHTML = `Valor: ${transCost1.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                t1t = 2;
                            } else {
                                firstFreightOptionTime.innerHTML = `Tempo aproximado de ${(transDuration1 / 24).toFixed(0)} dias úteis.`;
                                firstFreightOptionPrice.innerHTML = `Valor: ${transCost1.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                t1t = (transDuration1 / 24).toFixed(0);
                            }

                            t1p = transCost1;

                            if (transDuration2 < 23.0) {
                                secondFreightOptionTime.innerHTML = `Tempo de entrega aproximado: 1 dia útil.`;
                                secondFreightOptionPrice.innerHTML = `Valor: ${transCost2.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                t2t = 1;
                            } else if (transDuration2 < 47.0) {
                                secondFreightOptionTime.innerHTML = `Tempo de entrega aproximado: 2 dias úteis.`;
                                secondFreightOptionPrice.innerHTML = `Valor: ${transCost2.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                t2t = 2;
                            } else {
                                secondFreightOptionTime.innerHTML = `Tempo aproximado de ${(transDuration2 / 24).toFixed(0)} dias úteis.`;
                                secondFreightOptionPrice.innerHTML = `Valor: ${transCost2.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                t2t = (transDuration2 / 24).toFixed(0);
                            }

                            t2p = transCost2;

                            if (correiosDuration / 24 < 5.0) {
                                thirdFreightOptionTime.innerHTML = `Tempo de entrega aproximado: 5 dias úteis.`;
                                thirdFreightOptionPrice.innerHTML = `Valor: ${correiosCost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                ct = 5;
                            } else {
                                thirdFreightOptionTime.innerHTML = `Tempo aproximado de ${(correiosDuration / 24).toFixed(0)} dias úteis.`;
                                thirdFreightOptionPrice.innerHTML = `Valor: ${correiosCost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                ct = (correiosDuration / 24).toFixed(0);
                            }

                            cp = correiosCost;

                            isFreightPriceCalculated = true;
                        })
                        .catch((e) => {
                            console.log(`An error occured trying to the distance between the two points: ${e}`);
                        });
                })
                .catch((error) => {
                    console.error("Erro ao executar promise3:", error);
                });
        });

        otherAddressOptionInput.addEventListener("change", function () {
            freightContent.appendChild(addressForm);
            freightContent.appendChild(calculateFreightBox);

            deliveryForm.style = "margin: 40px 60px 20px;";
        });

        calculateFreightButton.addEventListener("click", function () {
            if (!streetInput.value || !cityInput.value || !stateInput.value || !zipCodeInput.value) {
            } else {
                let destinationPlacePromise = fetch(`https://nominatim.openstreetmap.org/search?format=json&street=${streetInput.value}&city=${cityInput.value}&state=${stateInput.value}&country=Brazil`)
                    .then((response) => response.json())
                    .then((response) => {
                        return [parseFloat(response[0].lat), parseFloat(response[0].lon)];
                    })
                    .catch((e) => {
                        console.log(`An error occured trying to find second latitude and longitude: ${e}`);
                    });

                let finalPromise = Promise.all([originPlacePromise, destinationPlacePromise]).then(([result1, result2]) => {
                    return [result1, result2];
                });

                finalPromise
                    .then((result) => {
                        fetch(`http://router.project-osrm.org/route/v1/driving/${result[0][1]},${result[0][0]};${result[1][1]},${result[1][0]}?overview=false`)
                            .then((response) => response.json())
                            .then((response) => {
                                let correiosTimeMultiplierParameter = 5.25;

                                let transDuration1 = (response.routes[0].duration / 60 / 60) * (correiosTimeMultiplierParameter / 2.25);
                                let transDuration2 = (response.routes[0].duration / 60 / 60) * (correiosTimeMultiplierParameter / 1.75);
                                let correiosDuration = (response.routes[0].duration / 60 / 60) * correiosTimeMultiplierParameter;

                                let correiosCostDivisorParameter = 172000;

                                let transCost1 = 22.0;
                                let transCost2 = 22.0;
                                let correiosCost = 22.0;

                                transCost1 += response.routes[0].distance / (correiosCostDivisorParameter / 2.25);
                                transCost2 += response.routes[0].distance / (correiosCostDivisorParameter / 1.75);
                                correiosCost += response.routes[0].distance / correiosCostDivisorParameter;

                                let boxCost = 8.4;

                                transCost1 += boxCost;
                                transCost2 += boxCost;
                                correiosCost += boxCost;

                                if (transDuration1 < 23.0) {
                                    firstFreightOptionTime.innerHTML = `Tempo de entrega aproximado: 1 dia útil.`;
                                    firstFreightOptionPrice.innerHTML = `Valor: ${transCost1.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                    t1t = 1;
                                } else if (transDuration1 < 47.0) {
                                    firstFreightOptionTime.innerHTML = `Tempo de entrega aproximado: 2 dias úteis.`;
                                    firstFreightOptionPrice.innerHTML = `Valor: ${transCost1.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                    t1t = 2;
                                } else {
                                    firstFreightOptionTime.innerHTML = `Tempo aproximado de ${(transDuration1 / 24).toFixed(0)} dias úteis.`;
                                    firstFreightOptionPrice.innerHTML = `Valor: ${transCost1.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                    t1t = (transDuration1 / 24).toFixed(0);
                                }

                                t1p = transCost1;

                                if (transDuration2 < 23.0) {
                                    secondFreightOptionTime.innerHTML = `Tempo de entrega aproximado: 1 dia útil.`;
                                    secondFreightOptionPrice.innerHTML = `Valor: ${transCost2.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                    t2t = 1;
                                } else if (transDuration2 < 47.0) {
                                    secondFreightOptionTime.innerHTML = `Tempo de entrega aproximado: 2 dias úteis.`;
                                    secondFreightOptionPrice.innerHTML = `Valor: ${transCost2.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                    t2t = 2;
                                } else {
                                    secondFreightOptionTime.innerHTML = `Tempo aproximado de ${(transDuration2 / 24).toFixed(0)} dias úteis.`;
                                    secondFreightOptionPrice.innerHTML = `Valor: ${transCost2.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                    t2t = (transDuration2 / 24).toFixed(0);
                                }

                                t2p = transCost2;

                                if (correiosDuration / 24 < 5.0) {
                                    thirdFreightOptionTime.innerHTML = `Tempo de entrega aproximado: 5 dias úteis.`;
                                    thirdFreightOptionPrice.innerHTML = `Valor: ${correiosCost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                    ct = 5;
                                } else {
                                    thirdFreightOptionTime.innerHTML = `Tempo aproximado de ${(correiosDuration / 24).toFixed(0)} dias úteis.`;
                                    thirdFreightOptionPrice.innerHTML = `Valor: ${correiosCost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
                                    ct = (correiosDuration / 24).toFixed(0);
                                }

                                cp = correiosCost;

                                isFreightPriceCalculated = true;
                            })
                            .catch((e) => {
                                console.log(`An error occured trying to the distance between the two points: ${e}`);
                            });
                    })
                    .catch((error) => {
                        console.error("Erro ao executar promise3:", error);
                    });
            }
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
    pp = product.price;

    const origin = document.createElement("p");
    origin.className = `origin`;
    fetch(`${path}product.json`)
        .then((response) => response.json())
        .then((products) => {
            let a = fetch(`${path}address.json`)
                .then((response) => response.json())
                .then((addresses) => {
                    origin.innerHTML = `Origem do produto: ${addresses[products[localStorage.getItem("currentProduct")].origin_address].city} - ${addresses[products[localStorage.getItem("currentProduct")].origin_address].state}`;
                });
        });

    const productInfo = document.createElement("div");
    productInfo.className = "product-info";

    productDiv.appendChild(image);
    productInfo.appendChild(name);
    productInfo.appendChild(description);
    productInfo.appendChild(price);
    productInfo.appendChild(origin);
    productDiv.appendChild(productInfo);
}

function loadCurrentAddressFromCurrentUser(defaultAddressOptionLabel) {
    fetch(`${path}user.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network answer was not ok.");
            }
            return response.json();
        })
        .then((users) => {
            fetch(`${path}address.json`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network answer was not ok.");
                    }
                    return response.json();
                })
                .then((addresses) => {
                    defaultAddressOptionLabel.innerHTML += `${addresses[users[localStorage.getItem("currentUser")].default_address].street}, `;

                    if (addresses[users[localStorage.getItem("currentUser")].default_address].house_number) {
                        defaultAddressOptionLabel.innerHTML += `${addresses[users[localStorage.getItem("currentUser")].default_address].house_number}`;
                    } else {
                        defaultAddressOptionLabel.innerHTML += `s/n`;
                    }

                    if (addresses[users[localStorage.getItem("currentUser")].default_address].building_name) {
                        defaultAddressOptionLabel.innerHTML += ` - ${addresses[users[localStorage.getItem("currentUser")].default_address].building_name}`;
                    }

                    if (addresses[users[localStorage.getItem("currentUser")].default_address].neighborhood) {
                        defaultAddressOptionLabel.innerHTML += ` - ${addresses[users[localStorage.getItem("currentUser")].default_address].neighborhood}`;
                    }

                    if (addresses[users[localStorage.getItem("currentUser")].default_address].city) {
                        defaultAddressOptionLabel.innerHTML += ` - ${addresses[users[localStorage.getItem("currentUser")].default_address].city}`;
                    }

                    if (addresses[users[localStorage.getItem("currentUser")].default_address].state) {
                        defaultAddressOptionLabel.innerHTML += ` - ${addresses[users[localStorage.getItem("currentUser")].default_address].state}`;
                    }

                    if (addresses[users[localStorage.getItem("currentUser")].default_address].zip_code) {
                        defaultAddressOptionLabel.innerHTML += ` (${addresses[users[localStorage.getItem("currentUser")].default_address].zip_code.substring(0, 5)}-${addresses[users[localStorage.getItem("currentUser")].default_address].zip_code.substring(5, 8)})`;
                    }
                });
        });
}

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
    }).catch((error) => {
        console.error("Houve um problema ao adicionar o contato:", error);
    }).finally(() => {
        window.location.href = "../09_SuccessfulPage/index.html";
    });
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
