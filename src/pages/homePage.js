import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../components/navBar/navBar";
import Advertisements from "../components/advertisements/advertisements";
import Categories from "../components/categories/categories";
import Products from "../components/products/products";
import Footer from "../components/footer/footer";

import { fetchCategories } from "../redux/categoriesSlice";
import { fetchProducts } from "../redux/productsSlice";

export default function HomePage() {
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchCategories({
        fields: `
          _id,
          name,
          image,
        `,
        sort: "createdAt",
      })
    );

    dispatch(
      fetchProducts({
        item: "0",
        queryParams: {
          fields: `
            _id,
            title,
            price,
            priceAfterDiscount,
            imageCover,
            quantity,
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
          fields: `
            _id,
            title,
            price,
            priceAfterDiscount,
            imageCover,
            quantity,
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
          fields: `
            _id,
            title,
            price,
            priceAfterDiscount,
            imageCover,
            quantity,
            sold,
            ratingsAverage,
            ratingsQuantity,
            save
          `,
        },
      })
    );

  }, [dispatch]);

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
      <Footer />
    </>
  );
}