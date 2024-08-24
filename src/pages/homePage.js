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
          limit: "10",
          fields: `
            _id,
            title,
            price,
            priceAfterDiscount,
            imageCover,
            quantity,
            sizes,
            sold,
            ratingsAverage,
            ratingsQuantity,
            save
          `,
        },
      })
    );

    dispatch(
      fetchProducts({
        item: "1",
        queryParams: {
          page: "1",
          limit: "10",
          fields: `
            _id,
            title,
            price,
            priceAfterDiscount,
            imageCover,
            quantity,
            sizes,
            sold,
            ratingsAverage,
            ratingsQuantity,
            save
          `,
        },
      })
    );

    dispatch(
      fetchProducts({
        item: "2",
        queryParams: {
          page: "1",
          limit: "10",
          fields: `
            _id,
            title,
            price,
            priceAfterDiscount,
            imageCover,
            quantity,
            sizes,
            sold,
            ratingsAverage,
            ratingsQuantity,
            save
          `,
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
      />
      <Products
        title={"MEW PRODUCTS"}
        status={products["1"].status}
        data={products["1"].data}
      />
      <Products
        title={"OUR BEST SELLERS"}
        status={products["2"].status}
        data={products["2"].data}
      />
      <Brands status={brands.status} data={brands.data} />
      <Footer />
    </>
  );
}

export default HomePage;
