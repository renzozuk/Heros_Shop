import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { loadSpecificProduct, loadReviews } from "../util/Data";
import "./Review.css";

export default function Review() {
    const { product } = useParams();
    const { updateTitle } = useOutletContext();

    const [currentProduct, setCurrentProduct] = useState();
    const [reviews, setReviews] = useState();

    useEffect(() => {
        loadData();
    });

    const loadData = () => {
        loadSpecificProduct(product)
            .then((specificProduct) => {
                setCurrentProduct(specificProduct);
            })
            /* .finally(() => {
                document.title = `${currentProduct.name} - Hero´s Shop`;
                updateTitle(`Avaliações do produto ${currentProduct.name}`);
            }) */;

        /* loadReviews(product).then((reviews) => {
            setReviews(reviews);
        }); */
    };

    return (
        <div className="review-container">
            <div className="review-product">
                <p>{currentProduct}</p>
                {/* <img className="review-product-image" src={currentProduct.photo} alt=""></img>
                <p className="review-product-name">{currentProduct.name}</p>
                <p className="review-product-description">{currentProduct.description}</p>
                <p className="review-product-price">{currentProduct.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <div className="review-product-buttons">
                    <button className="">Comprar</button>
                    <button className="">Voltar</button>
                </div> */}
            </div>
            <div className="review-comments">
                <p>{reviews}</p>
            </div>
        </div>
    );
}
