import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../components/navBar/navBar";
import Advertisements from "../components/advertisements/advertisements";
import Categories from "../components/categories/categories";
import Products from "../components/products/products";

import { fetchCategories } from "../redux/categoriesSlice";
import { fetchProducts } from "../redux/productsSlice";

export default function HomePage() {
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories({
      sort: 'createdAt',
    }));
    dispatch(fetchProducts({
      sort: '-createdAt',
    }));    
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Advertisements />
      <Categories status={categories.status} data={categories.data} />
      <Products title={'OUR OFFERS'} status={products.status} data={products.data} />      
      <Products title={'MEW PRODUCTS'} status={products.status} data={products.data} />
      <Products title={'OUR BEST SELLERS'} status={products.status} data={products.data} />
    </>
  );
}