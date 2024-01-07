import propTypes from 'prop-types';
import { useProducts } from '../../contexts/products';
import { IoIosRemoveCircle } from "react-icons/io";

import style from "./cart-product.module.css";

const CartProductCard = ({ data }) => {
  const { id, title, price } = data;

  const { removeFromCart } = useProducts();

  return (
    <section className={style.product_card}>
      <div className={style.infos}>
        <h2 className={style.price}>
          {price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
        </h2>
        <h2 className={style.title}>{title}</h2>
      </div>

      <button
        type="button"
        className={style.button}
        onClick={() => removeFromCart(id)}
      >
        <IoIosRemoveCircle />
      </button>
    </section>
  );
}

CartProductCard.propTypes = {
  data: propTypes.shape({}).isRequired,
};

export default CartProductCard;
