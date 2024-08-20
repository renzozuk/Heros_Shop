import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import Comment from "../components/Comment";
import { loadSpecificProduct, loadReviews } from "../util/Data";
import "./Review.css";

export default function Review() {
    const { product } = useParams();
    const { updateTitle } = useOutletContext();

    const [currentProduct, setCurrentProduct] = useState();
    const [reviews, setReviews] = useState([]);

    const loadData = () => {
        loadSpecificProduct(product).then((specificProduct) => {
            setCurrentProduct(specificProduct);
            document.title = `${specificProduct.name} | Hero´s Shop`;
            updateTitle(`Avaliações do produto ${specificProduct.name}`);
        });

        loadReviews(product).then((reviews) => {
            setReviews(reviews);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="review-container">
            {currentProduct && (
                <div className="review-product">
                    <img className="review-product-image" src={currentProduct.photo} alt=""></img>
                    <p className="review-product-name">{currentProduct.name}</p>
                    <p className="review-product-description">{currentProduct.description}</p>
                    <p className="review-product-price">{currentProduct.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    <div className="review-product-buttons">
                        <button className="review-product-button">Comprar</button>
                        <button className="review-product-button">Voltar</button>
                    </div>
                </div>
            )}
            <div className="review-comments">
                {reviews && (reviews.map((review) => (
                    <Comment photo={review.userPhoto} username={review.userName} stars={review.stars} comment={review.comment} />
                )))}
            </div>
        </div>
    );
}
