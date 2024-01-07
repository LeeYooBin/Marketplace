import ProductsProvider from "../../contexts/products";
import style from "./home.module.css";
import Header from "../../components/Header";
import Products from "../../components/Products";

const Home = () => (
  <ProductsProvider>
    <main className={style.home}>
      <Header />
      <Products />
    </main>
  </ProductsProvider>
);

export default Home;