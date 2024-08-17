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
        document.title = category ? `Hero´s Shop - ${capitalizeSentence(category.replace("_", " "))}` : "Hero´s Shop";
        updateTitle(category ? capitalizeSentence(category.replace("_", " ")) : "Produtos em Destaque");
    });

    const loadData = () => {
        loadProducts(category).then((productsData) => {
            setProducts(productsData);
        });
    };

    return (
        <div className="products-container">
            {products.map((product) => (
                <Product key={product.id} image={product.photo || "https://placehold.jp/24/ff2d00/ffffff/150x150.png?text=no+photo"} name={product.name} description={product.description} price={product.price} />
            ))}
        </div>
    );
}

export default Department;