import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Payment.css";

export default function Payment() {
    const { updateTitle } = useOutletContext();

    const [paymentOption, setPaymentOption] = useState(0);
    const [freightOption, setFreightOption] = useState(0);

    useEffect(() => {
        document.title = `Pagamento | Hero´s Shop`;
        updateTitle(`Pagamento`);
    });

    return (
        localStorage.getItem("currentUser") ? (
            <div className="payment-container payment-container-logged">
                <div className="payment-options-buttons">
                    <button className="payment-option-button">Cartão de crédito/débito</button>
                    <button className="payment-option-button">Boleto bancário</button>
                </div>
            </div>
        ) : (
            <div className="payment-container payment-container-not-logged">
                <p className="user-not-logged-advice">É necessário estar logado para poder continuar com a compra.</p>
            </div>
        )
    );
}