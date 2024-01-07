import { useEffect, useState } from "react";
import { useProducts } from "../../contexts/products";
import { Link } from "react-router-dom";
import style from "./cart.module.css";
import CartProductCard from "../../components/CartProductCard";
import { IoMdArrowRoundBack } from "react-icons/io";


const User = () => {
  const [cartState, setCartState] = useState([]);
  const { cart } = useProducts();

  useEffect(() => {
    if (cart.length === 0) setCartState([]);
    else setCartState([...cart]);
  }, [cart]);

  return (
    <main className={style.cart}>
      <Link to="/home" className={style.icon}>
        <IoMdArrowRoundBack />
      </Link>
      {cart.length === 0 ? <h2 className={style.empty}>The Cart is Empty</h2> : (
        <div className={style.products}>
          {
            cartState.map(item => (
              <CartProductCard key={item.id} data={item} />
            ))
          }
        </div>
      )}
    </main>
  );
};

export default User;