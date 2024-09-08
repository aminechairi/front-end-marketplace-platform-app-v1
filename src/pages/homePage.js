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

const limit = () => {
  if (window.matchMedia("(min-width: 1536px)").matches) {
    return "10"; // 2xl
  } else if (window.matchMedia("(min-width: 1280px)").matches) {
    return "10"; // xl
  } else if (window.matchMedia("(min-width: 1024px)").matches) {
    return "10"; // lg
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    return "9"; // md
  } else if (window.matchMedia("(min-width: 640px)").matches) {
    return "10"; // sm
  } else {
    return "10"; // Default limit for small screens
  }
};

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
          limit: limit(),
          sort: `-priceAfterDiscount`,
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
          limit: limit(),
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
          limit: limit(),
          sort: `-sold`,
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
        limit={limit()}
      />
      <Products
        title={"MEW PRODUCTS"}
        status={products["1"].status}
        data={products["1"].data}
        limit={limit()}
      />
      <Products
        title={"OUR BEST SELLERS"}
        status={products["2"].status}
        data={products["2"].data}
        limit={limit()}
      />
      <Brands status={brands.status} data={brands.data} />
      <Footer />
    </>
  );
}

export default HomePage;
