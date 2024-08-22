import { useEffect } from "react";
import "./Successful.css";

export default function Successful() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js";
        script.integrity = "sha384-rbsA7aIYPf4xA5sq73rY+8YB2I4UzKjF1LMpZ6XqRxXb4J3U5SujCkxLqsmX5sq5";
        script.crossOrigin = "anonymous";
        script.onload = () => console.log('Bootstrap script loaded');
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);

    return (
        <div className="outer-successful-message">
            <p class="text-white">Parabéns! Sua compra foi concluída com sucesso!</p>
            <p class="text-white">Você pode acompanhar seus pedidos já feitos em seu perfil.</p>
        </div>
    );
}