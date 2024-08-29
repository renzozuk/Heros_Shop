import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import Product from "../components/Product";
import { loadProducts } from "../util/Data";
import { capitalizeSentence } from "../util/Sentence";
import "./Department.css";

const Department = () => {
    const { category } = useParams();
    const { updateTitle } = useOutletContext();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadData();
    });

    const loadData = () => {
        loadProducts(category)
            .then((productsData) => {
                setProducts(productsData);
            })
            .finally(() => {
                document.title = category ? `${capitalizeSentence(category.replace("_", " "))} | Hero´s Shop` : "Hero´s Shop";
                updateTitle(category ? capitalizeSentence(category.replace("_", " ")) : "Produtos em Destaque");
            });
    };

    return (
        <div className="products-container">
            {products.map((product) => (
                <Product key={product.id} image={product.photo || "https://placehold.jp/24/ff2d00/ffffff/150x150.png?text=no+photo"} name={product.name} description={product.description} price={product.price} id={product.id} />
            ))}
        </div>
    );
};

export default Department;
