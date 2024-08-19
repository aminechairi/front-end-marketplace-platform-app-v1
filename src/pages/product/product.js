import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./product.css";

import NavBar from "../../components/navBar/navBar";
import ProductSlider from "../../components/productSlider/productSlider";
import ProductInformation from "../../components/productInformation/productInformation";
import ProductSliderSkeletion from "../../components/productSlider/productSliderSkeletion";
import ProductInformationSkeleton from "../../components/productInformation/productInformationSkeleton";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/scrollToTop/scrollToTop";

import baseUrl from "../../config/config";
import cookieManager from "../../utils/cookieManager";
import { HOME } from "../../routes";

function Product() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setProductData(null);
      const response = await fetch(`${baseUrl}/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
        },
      });

      const data = await response.json();

      if (data.data) {
        setProductData(data);
        const images = [data.data.imageCover, ...data.data.images];
        setProductImages(images);
      } else {
        setProductData(data);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <NavBar />

      {productData === null ? (
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
      ) : productData?.data ? (
        <div className="product_page">
          <div className="container">
            <div className="ab">
              <section className="section_1">
                <>
                  <ProductSlider
                    productImages={productImages}
                    _id={productData._id}
                    save={productData.save}
                  />
                  <ProductInformation productInfo={productData?.data} />
                </>
              </section>
            </div>
          </div>
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
