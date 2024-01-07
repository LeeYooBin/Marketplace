import React, { useState, useEffect, createContext, useContext } from 'react';

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("cart"))) {
      setCart(JSON.parse(sessionStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    if (!products.length) searchProducts("samsung");
  }, [products]);

  const searchProducts = async (product) => {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
    const data = await response.json();
    setProducts(data.results);
  };

  const isProductInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  const addToCart = (product) => {
    if (!isProductInCart(product.id)) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <ProductsContext.Provider value={{ products, searchProducts, cart, addToCart, removeFromCart }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};

export default ProductsProvider;
