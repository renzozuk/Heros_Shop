import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Successful.css";

export default function Successful() {
    const { updateTitle } = useOutletContext();

    useEffect(() => {
        document.title = `Compra finalizada | Hero´s Shop`;
        updateTitle(`Compra finalizada`);
    });

    return (
        <div className="outer-successful-message">
            <p class="successful-message">Parabéns! Sua compra foi concluída com sucesso!</p>
            <p class="successful-message">Você pode acompanhar seus pedidos já feitos em seu perfil.</p>
        </div>
    );
}
