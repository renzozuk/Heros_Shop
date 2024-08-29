import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { getAddressFromProduct, loadSpecificProduct } from "../util/Data";
import { confirmOrder, isCardNumberValid } from "../util/PaymentHelper";
import "./Payment.css";

export default function Payment() {
    const navigate = useNavigate();
    const { product } = useParams();
    const { updateTitle } = useOutletContext();

    const [currentProduct, setCurrentProduct] = useState();
    const [currentProductAddress, setCurrentProductAddress] = useState();
    const [paymentOption, setPaymentOption] = useState(0);
    const [freightOption, setFreightOption] = useState(0);

    const [cardOwnerName, setCardOwnerName] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [cardCvv, setCardCvv] = useState();
    const [cardExpirationDate, setCardExpirationDate] = useState();

    useEffect(() => {
        loadSpecificProduct(product).then((specificProduct) => {
            setCurrentProduct(specificProduct);
            setCurrentProductAddress(getAddressFromProduct(specificProduct));
        });

        document.title = `Pagamento | Hero´s Shop`;
        updateTitle(`Pagamento`);
    });

    function confirmPurchase() {
        if(!cardOwnerName || !cardNumber || !cardCvv || !cardExpirationDate){
            window.alert("Preencha todos os dados para poder continuar com a compra.");
            return;
        }

        if(isCardNumberValid(cardNumber)){
            confirmOrder(product, localStorage.getItem("currentUser"));
            navigate("/successful");
        }else{
            window.alert("Número de cartão inválido.");
        }
    }

    function ConfirmationButton() {
        return (
            <div className="outer-confirmation-button">
                <button className="confirmation-button" onClick={confirmPurchase}>Confirmar compra</button>
            </div>
        );
    }

    return (
        localStorage.getItem("currentUser") ? (
            <div className="payment-container payment-container-logged">
                <p className="chosen-product-title">Dados do produto escolhido</p>
                {currentProduct && <div className="chosen-product-data">
                    <div className="outer-chosen-product-image">
                        <img className="chosen-product-image" src={currentProduct.photo} alt=""></img>
                    </div>
                    <div className="outer-chosen-product-information">
                        <p className="chosen-product-name">{currentProduct.name}</p>
                        <p className="chosen-product-description">{currentProduct.description}</p>
                        <p className="chosen-product-price">{currentProduct.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                        {/* {currentProductAddress && <p>{`Origem do produto: ${currentProductAddress}`}</p>} */}
                    </div>
                </div>}
                <p className="payment-options-title">Escolha a opção de pagamento desejada</p>
                <div className="payment-options-buttons">
                    <button className="payment-option-button" onClick={() => setPaymentOption(1)}>Cartão de crédito/débito</button>
                    <button className="payment-option-button" onClick={() => setPaymentOption(2)}>Boleto bancário</button>
                </div>
                {paymentOption === 1 && 
                <div className="outer-card-form">
                    <form className="card-form">
                        <div className="card-form-input-box">
                            <label htmlFor="number_card">Nome completo do titular</label>
                            <input type="text" id="name" onChange={(e) => setCardOwnerName(e.target.value)} required></input>
                        </div>
                        <div className="card-form-input-box">
                            <label htmlFor="number_card">Número do cartão</label>
                            <input type="text" id="number_card" onChange={(e) => setCardNumber(e.target.value)} required></input>
                        </div>
                        <div className="card-form-input-box">
                            <label htmlFor="number_card">CVV</label>
                            <input type="text" id="cvv" onChange={(e) => setCardCvv(e.target.value)} required></input>
                        </div>
                        <div className="card-form-input-box">
                            <label htmlFor="number_card">Data de vencimento</label>
                            <input type="month" id="expiration_date" min={`2024-08`} onChange={(e) => setCardExpirationDate(e.target.value)} required></input>
                        </div>
                    </form>
                    {/* <p>{cardNumber.slice(0, 4)} {cardNumber.slice(4, 8)} {cardNumber.slice(8, 12)} {cardNumber.slice(12, 16)}</p> */}
                    {/* <div className="card-ui">

                    </div> */}
                    <ConfirmationButton />
                </div>}
                {paymentOption === 2 && 
                <div>
                    <p style={{fontSize: `110%`, textAlign: `center`}}>Este método de pagamento ainda não está disponível. Por favor, escolha outro método de pagamento diferente.</p>
                </div>}
            </div>
        ) : (
            <div className="payment-container payment-container-not-logged">
                <p className="user-not-logged-advice">É necessário estar logado para poder continuar com a compra.</p>
            </div>
        )
    );
}