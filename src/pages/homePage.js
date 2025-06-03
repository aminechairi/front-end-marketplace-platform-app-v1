import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../components/navBar/navBar";
import Advertisements from "../components/advertisements/advertisements";
import Categories from "../components/categories/categories";
import Products from "../components/products/products";
import ProductsSlider from "../components/productsSlider/productsSlider";
import Brands from "../components/brands/brands";
import Footer from "../components/footer/footer";

import useFetch from "../hooks/useFetch";
import { fetchCategories } from "../redux/categoriesSlice";
import { fetchBrands } from "../redux/brandsSlice";
import baseUrl from "../config/config";
import cookieManager from "../utils/cookieManager";
import { productsFields } from "../utils/specificFields";
import limitOfProducts from "../utils/limitOfProducts";

// Set product limits based on screen size
const productLimits = [8, 6, 6, 8, 10, 10];

function HomePage() {
  const categories = useSelector((state) => state.categories);
  const { data: products1, fetchData: fetchProducts1 } = useFetch();
  const { data: products2, fetchData: fetchProducts2 } = useFetch();
  const brands = useSelector((state) => state.brands);
  const { data: products3, fetchData: fetchProducts3 } = useFetch();
  const { data: products4, fetchData: fetchProducts4 } = useFetch();
  const dispatch = useDispatch();

  useEffect(() => {
    const JWTToken = `Bearer ${cookieManager("get", "JWTToken")}`;

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

    fetchProducts1({
      url: `${baseUrl}/products`,
      method: "get",
      params: {
        page: "1",
        limit: `20`,
        sort: `-sold`,
        fields: productsFields,
      },
      headers: {
        Authorization: JWTToken,
      },
    });

    fetchProducts2({
      url: `${baseUrl}/products`,
      method: "get",
      params: {
        page: "1",
        limit: `${limitOfProducts(productLimits)}`,
        fields: productsFields,
        "discountPercent[lte]": 59,
      },
      headers: {
        Authorization: JWTToken,
      },
    });

    if (!brands.data) {
      dispatch(
        fetchBrands({
          page: "1",
          limit: "48",
          fields: `
            _id,
            name,
            image,
          `,
          sort: "createdAt",
        })
      );
    }

    fetchProducts3({
      url: `${baseUrl}/products`,
      method: "get",
      params: {
        page: "1",
        limit: "20",
        fields: productsFields,
      },
      headers: {
        Authorization: JWTToken,
      },
    });

    fetchProducts4({
      url: `${baseUrl}/products`,
      method: "get",
      params: {
        page: "1",
        limit: `${limitOfProducts(productLimits)}`,
        fields: productsFields,
        "price[lte]": 120,
      },
      headers: {
        Authorization: JWTToken,
      },
    });
  }, [
    categories.data,
    fetchProducts1,
    fetchProducts2,
    brands.data,
    fetchProducts3,
    fetchProducts4,
    dispatch,
  ]);

  return (
    <>
      <NavBar />
      <Advertisements />
      <Categories
        title={"CATEGORIES"}
        status={categories.status}
        data={categories.data}
        queryParam={"category"}
      />
      <ProductsSlider
        title={"THE BEST SELLERS"}
        status={products1.status}
        data={products1.data}
      />
      <Products
        title={"OFFERS"}
        status={products2.status}
        data={products2.data}
        limitOfProducts={limitOfProducts(productLimits)}
      />
      <Brands status={brands.status} data={brands.data} />
      <ProductsSlider
        title={"NES PRODUCTS"}
        status={products3.status}
        data={products3.data}
      />
      <Products
        title={"CHEAP PRODUCTS"}
        status={products4.status}
        data={products4.data}
        limitOfProducts={limitOfProducts(productLimits)}
      />
      <Footer />
    </>
  );
}

export default HomePage;
