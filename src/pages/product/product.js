import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./product.css";

import NavBar from "../../components/navBar/navBar";
import ProductSlider from "../../components/productSlider/productSlider";
import ProductInformation from "../../components/productInformation/productInformation";
import ProductSliderSkeletion from "../../components/productSlider/productSliderSkeletion";
import ProductInformationSkeleton from "../../components/productInformation/productInformationSkeleton";
import Products from "../../components/products/products";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/scrollToTop/scrollToTop";

import useFetch from "../../hooks/useFetch";
import baseUrl from "../../config/config";
import cookieManager from "../../utils/cookieManager";
import { HOME } from "../../routes";
import { productsFields } from "../../utils/specificFields";
import limitOfProducts from "../../utils/limitOfProducts";

// Limits according to media queries
const limits = [6, 6, 6, 4, 5, 5];

function Product() {
  const { productId } = useParams();
  const { data: product, fetchData: fetchProduct } = useFetch();
  const [productImages, setProductImages] = useState([]);
  const { data: products, fetchData: fetchProducts } = useFetch();

  useEffect(() => {
    const JWTToken = `Bearer ${cookieManager("get", "JWTToken")}`;

    fetchProduct({
      url: `${baseUrl}/products/${productId}`,
      headers: {
        Authorization: JWTToken,
      },
    });
  }, [fetchProduct, productId]);

  useEffect(() => {
    if (product.status === "succeeded" && product.data?.data) {
      setProductImages([
        product.data?.data.imageCover,
        ...product.data?.data.images,
      ]);
    } else {
      setProductImages([]);
    }
  }, [product.status, product.data?.data]);

  useEffect(() => {
    if (product.status === "succeeded" && product.data?.data) {
      // The same relations.
      const theSameRelations = {
        category: product.data?.data.category?._id,
        subCategories: product.data?.data.subCategories,
        underSubCategories: product.data?.data.underSubCategories,
        brand: product.data?.data.brand?._id
      };

      const JWTToken = `Bearer ${cookieManager("get", "JWTToken")}`;

      fetchProducts({
        url: `${baseUrl}/products`,
        method: "get",
        params: {
          page: "1",
          limit: `${limitOfProducts(limits)}`,
          sort: `-sold,-ratingsAverage`,
          fields: productsFields,
          ...theSameRelations,
        },
        headers: {
          Authorization: JWTToken,
        },
      });
    }
  }, [fetchProducts, product.data?.data, product.status]);

  return (
    <>
      <NavBar />
      {product.status === "loading" ? (
        <div className="product_page">
          <div className="container">
            <div className="ab">
              <section className="section_1">
                <>
                  <ProductSliderSkeletion />
                  <ProductInformationSkeleton />
                </>
              </section>
            </div>
          </div>
        </div>
      ) : product.status === "succeeded" && product.data?.data ? (
        <div className="product_page">
          <div className="container">
            <div className="ab">
              <section className="section_1">
                <>
                  <ProductSlider
                    productImages={productImages}
                    _id={product.data?.data._id}
                    isFavorite={product.data?.data.isFavorite}
                  />
                  <ProductInformation productInfo={product.data?.data} />
                </>
              </section>
            </div>
          </div>
          <Products
            title={"PRODUCTS RELATED TO THIS ITEM"}
            status={products.status}
            data={products.data}
            limitOfProducts={limitOfProducts(limits)}
          />
        </div>
      ) : (
        <div className="noFound">
          <div className="container">
            <div className="ab">
              <img src={require("../../imgs/no-results.png")} alt="" />
              <h1>Uh-oh, something went wrong here</h1>
              <p>Just keep browsing to get back on track</p>
              <ScrollToTop>
                <Link to={HOME}>
                  <button className="buttom">Back to home page</button>
                </Link>
              </ScrollToTop>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Product;
