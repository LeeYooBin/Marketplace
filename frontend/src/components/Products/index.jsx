import { useProducts } from '../../contexts/products';
import ProductCard from "./ProductCard";
import style from "./products.module.css";

const Products = () => {
  const { products } = useProducts();
  
  return (
    <div className={style.products}>
      {products.map(product => (
        <ProductCard key={product.id} data={product}/>
      ))}
    </div>
  );
}

export default Products;