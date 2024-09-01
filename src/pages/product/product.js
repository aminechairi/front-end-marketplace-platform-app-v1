import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./product.css";

import NavBar from "../../components/navBar/navBar";
import ProductSlider from "../../components/productSlider/productSlider";
import ProductInformation from "../../components/productInformation/productInformation";
import ProductSliderSkeletion from "../../components/productSlider/productSliderSkeletion";
import ProductInformationSkeleton from "../../components/productInformation/productInformationSkeleton";
import Products from "../../components/products/products";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/scrollToTop/scrollToTop";

import baseUrl from "../../config/config";
import cookieManager from "../../utils/cookieManager";
import { HOME } from "../../routes";
import { fetchProducts } from "../../redux/productsSlice";

function Product() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setProductData(null);

        const response = await fetch(`${baseUrl}/products/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.data) {
          setProductData(data);
          const images = [data.data.imageCover, ...data.data.images];
          setProductImages(images);
        } else {
          setProductData(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProductData({ error: error.message });
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (productData?.data) {
      // The same relations.
      const theSameRelations = {};
      if (productData.data.category) {
        theSameRelations.category = productData.data.category._id;
      }
      if (productData.data.subCategories.length > 0) {
        theSameRelations.subCategories = productData.data.subCategories;
      }
      if (productData.data.underSubCategories.length > 0) {
        theSameRelations.underSubCategories =
          productData.data.underSubCategories;
      }
      if (productData.data.brand) {
        theSameRelations.brand = productData.data.brand._id;
      }

      dispatch(
        fetchProducts({
          item: "0",
          queryParams: {
            page: "1",
            limit: "10",
            ...theSameRelations,
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
    }
  }, [productData, dispatch]);

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
                    _id={productData.data._id}
                    save={productData.data.save}
                  />
                  <ProductInformation productInfo={productData.data} />
                </>
              </section>
            </div>
          </div>
          <Products
            title={"PRODUCTS RELATED TO THIS ITEM"}
            status={products["0"].status}
            data={products["0"].data}
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
