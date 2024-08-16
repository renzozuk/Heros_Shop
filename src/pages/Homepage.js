import { useEffect, useState } from "react";
import Product from "../components/Product";
import loadProducts from "../util/data";
import "./Homepage.css";

const Homepage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadData();
    });

    const loadData = () => {
        loadProducts().then((productsData) => {
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

export default Homepage;