import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./product.css";

import NavBar from "../../components/navBar/navBar";
import ProductSlider from "../../components/productSlider/productSlider";
import ProductInformation from "../../components/productInformation/productInformation";
import ProductSliderSkeletion from "../../components/productSlider/productSliderSkeletion";
import ProductInformationSkeleton from "../../components/productInformation/productInformationSkeleton";
import Products from "../../components/products/products";
import Footer from "../../components/footer/footer";

import useFetch from "../../hooks/useFetch";
import { HOME } from "../../routes";
import { productsFields } from "../../utils/specificFields";
import limitOfProducts from "../../utils/limitOfProducts";
import WentWrong from "../../components/wentWrong/wentWrong";

// Limits according to media queries
const limits = [6, 6, 6, 4, 5, 5];

function Product() {
  const { productId } = useParams();
  const { data: product, fetchData: fetchProduct } = useFetch();
  const [productImages, setProductImages] = useState([]);
  const { data: products, fetchData: fetchProducts } = useFetch();

  useEffect(() => {
    fetchProduct({
      url: `/products/${productId}`,
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
        brand: product.data?.data.brand?._id,
      };

      fetchProducts({
        url: `/products`,
        method: "get",
        params: {
          page: "1",
          limit: `${limitOfProducts(limits)}`,
          sort: `-sold,-ratingsAverage`,
          fields: productsFields,
          ...theSameRelations,
        },
      });
    }
  }, [fetchProducts, product.data?.data, product.status]);

  if (product.status === "loading") {
    return (
      <>
        <NavBar />
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
        <Footer />
      </>
    );
  }

  if (product.status === "succeeded" && product.data?.data) {
    return (
      <>
        <NavBar />
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
        <Footer />
      </>
    );
  }

  if (product.status === "failed" && `${product.data.message}`.startsWith("No product")) {
    return (
      <>
        <NavBar />
        <WentWrong
          srcImage={require("../../imgs/error-404.png")}
          title="Oops! The product you are looking for does not exist."
          paragraph="It may have been removed, or the link you followed may be broken.\nPlease check the URL or return to the home page."
          buttonContent="BACK TO HOME PAGE"
          to={HOME}
        />
        <Footer />
      </>
    );
  }

  if (product.status === "failed") {
    return (
      <>
        <NavBar />
        <WentWrong
          srcImage={require("../../imgs/went wrong.png")}
          title="Something went wrong."
          paragraph="We couldn't retrieve the product information.\nPlease try again later."
          buttonContent="TRY AGAIN"
          onClick={() => {
            fetchProduct({
              url: `/products/${productId}`,
            });
          }}
        />
        <Footer />
      </>
    );
  }
}

export default Product;
