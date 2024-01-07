import propTypes from 'prop-types';
import { useProducts } from '../../../contexts/products';
import { BsFillCartPlusFill } from 'react-icons/bs';

import style from "./product-card.module.css";

function ProductCard({ data }) {
  const { title, thumbnail, price } = data;

  const { addToCart } = useProducts();

  return (
    <section className={style.product_card}>
      <img
        src={thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}
        alt="product"
        className={style.image}
      />

      <div className={style.infos}>
        <h2 className={style.price}>
          {price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
        </h2>
        <h2 className={style.title}>{title}</h2>
      </div>

      <button
        type="button"
        className={style.button}
        onClick={() => addToCart(data)}
      >
        <BsFillCartPlusFill />
      </button>
    </section>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  data: propTypes.shape({}).isRequired,
};