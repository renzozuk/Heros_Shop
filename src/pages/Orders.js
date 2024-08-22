import { useOutletContext } from "react-router-dom";
import { loadUserOrders, loadOrdersProducts } from "../util/OrdersUtil";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import Order from "../components/OrdersProduct";

function Orders(){


    const auth = getAuth();
    const { updateTitle } = useOutletContext();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadUserDataOrders();
    }, []);

    const loadUserDataOrders = () => {
        auth.onAuthStateChanged((authenticationUser) => {
            if (authenticationUser) {
                loadOrders(authenticationUser.uid);
            } else {
                console.error("Usuário não autenticado");
            }
        });
    };

    const loadOrders = async (uid) => {
        const orders = await loadUserOrders(uid);
        loadOrdersProducts(orders)
            .then((productsData) => {
                setProducts(productsData);
            })
            .finally(() => {
                updateTitle("Meus Pedidos");
            });
    };    

    return (
        <div className="products-container">
            {products.map((product) => (
                <Order key={product.id} image={product.photo || "https://placehold.jp/24/ff2d00/ffffff/150x150.png?text=no+photo"} name={product.name} description={product.description} price={product.price} id={product.id} />
            ))}
        </div>
    );
}

export default Orders;