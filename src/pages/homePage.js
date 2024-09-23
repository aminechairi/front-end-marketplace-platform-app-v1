import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../components/navBar/navBar";
import Advertisements from "../components/advertisements/advertisements";
import Categories from "../components/categories/categories";
import Products from "../components/products/products";
import Brands from "../components/brands/brands";
import Footer from "../components/footer/footer";

import { fetchCategories } from "../redux/categoriesSlice";
import { fetchProducts } from "../redux/productsSlice";
import { fetchBrands } from "../redux/brandsSlice";
import { productsFields } from "../utils/specificFields";
import limitOfProducts from "../utils/limitOfProducts";

// Set product limits based on screen size
const productLimits = [8, 6, 6, 8, 10, 10];

function HomePage() {
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const brands = useSelector((state) => state.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories.data) {
      dispatch(
        fetchCategories({
          page: "1",
          limit: "40",
          fields: `
            _id,
            name,
            image,
          `,
          sort: "createdAt",
        })
      );
    }

    dispatch(
      fetchProducts({
        item: "0",
        queryParams: {
          page: "1",
          limit: `${limitOfProducts(productLimits)}`,
          fields: productsFields,
          "discountPercent[lte]": 59,
        },
      })
    );

    dispatch(
      fetchProducts({
        item: "1",
        queryParams: {
          page: "1",
          limit: `${limitOfProducts(productLimits)}`,
          fields: productsFields,
        },
      })
    );

    dispatch(
      fetchProducts({
        item: "2",
        queryParams: {
          page: "1",
          limit: `${limitOfProducts(productLimits)}`,
          sort: `-sold`,
          fields: productsFields,
        },
      })
    );

    if (!brands.data) {
      dispatch(
        fetchBrands({
          page: "1",
          limit: "48",
          fields: `
            _id,
            image,
          `,
          sort: "createdAt",
        })
      );
    }
  }, [brands.data, categories.data, dispatch]);

  return (
    <>
      <NavBar />
      <Advertisements />
      <Categories status={categories.status} data={categories.data} />
      <Products
        title={"OUR OFFERS"}
        status={products["0"].status}
        data={products["0"].data}
        limitOfProducts={limitOfProducts(productLimits)}
      />
      <Products
        title={"MEW PRODUCTS"}
        status={products["1"].status}
        data={products["1"].data}
        limitOfProducts={limitOfProducts(productLimits)}
      />
      <Products
        title={"OUR BEST SELLERS"}
        status={products["2"].status}
        data={products["2"].data}
        limitOfProducts={limitOfProducts(productLimits)}
      />
      <Brands status={brands.status} data={brands.data} />
      <Footer />
    </>
  );
}

export default HomePage;
