import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./product.css";

import NavBar from "../../components/navBar/navBar";
import ProductSlider from "../../components/productSlider/productSlider";
import ProductInformation from "../../components/productInformation/productInformation";
import ProductSliderSkeletion from "../../components/productSlider/productSliderSkeletion";
import ProductInformationSkeleton from "../../components/productInformation/productInformationSkeleton";
import Footer from "../../components/footer/footer";

import baseUrl from "../../config/config";
import cookieManager from "../../utils/cookieManager";

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
        setProductData(data.data);
        const images = [data.data.imageCover, ...data.data.images];
        setProductImages(images);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <NavBar />
      <div className="product_page">
        <div className="container">
          <div className="ab">
            <section className="section_1">
              {productData ? (
                <>
                  <ProductSlider
                    productImages={productImages}
                    _id={productData._id}
                    save={productData.save}
                  />
                  <ProductInformation productInfo={productData} />
                </>
              ) : (
                <>
                  <ProductSliderSkeletion />
                  <ProductInformationSkeleton />
                </>
              )}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;
