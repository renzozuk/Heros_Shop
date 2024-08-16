import "./Product.css";

export default function Product(props) {
    return (
        <div className="product">
            <img className="product-image" src={props.image}></img>
            <p className="product-name">{props.name}</p>
            <p className="product-description">{props.description}</p>
            <p className="product-price">{props.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            <div className="product-buttons">
                <button className="product-button product-buy-button">Comprar</button>
                <button className="product-button product-detail-button">Ver Detalhes</button>
            </div>
        </div>
    );
}