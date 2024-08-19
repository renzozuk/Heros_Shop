import { Link } from 'react-router-dom';
import "./Product.css";

export default function Product(props) {
    return (
        <div className="product">
            <img className="product-image" src={props.image} alt=""></img>
            <p className="product-name">{props.name}</p>
            <p className="product-description">{props.description}</p>
            <p className="product-price">{props.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            <div className="product-buttons">
                <button className="product-button product-buy-button"><Link>Comprar</Link></button>
                <button className="product-button product-detail-button"><Link to={`/reviews/${props.id}`}>Ver Detalhes</Link></button>
            </div>
        </div>
    );
}