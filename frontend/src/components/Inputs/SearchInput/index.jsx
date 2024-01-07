import React, { useState } from 'react';
import { useProducts } from '../../../contexts/products';
import style from "./search.module.css";
import { BsSearch } from 'react-icons/bs';

const SearchInput = () => {
  const { searchProducts } = useProducts();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (searchValue) searchProducts(searchValue);
  };

  return (
    <search className={style.search} >
      <input 
        type="text" 
        placeholder="Search products"
        value={searchValue}
        onChange={handleSearch}
        className={style.input}
      />
      <button 
        type="button" 
        className={style.button}
      >
        <BsSearch />
      </button>
    </search>
  )
};

export default SearchInput;