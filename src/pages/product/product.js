import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

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
import { productsFields } from "../../utils/specificFields";
import limitOfProducts from "../../utils/limitOfProducts";

// Limits according to media queries
const limits = [6, 6, 6, 5, 5, 5];

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    data: null,
    status: "idle",
  });
  const [productImages, setProductImages] = useState([]);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      setProduct({
        data: null,
        status: "loading",
      });

      try {
        const response = await axios.get(`${baseUrl}/products/${productId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
          },
        });

        const productImages = [
          response.data.data.imageCover,
          ...response.data.data.images,
        ];
        setProductImages(productImages);

        setProduct({
          data: response.data,
          status: "succeeded",
        });
      } catch (err) {
        if (err.response?.data) {
          setProduct({
            data: err.response?.data,
            status: "succeeded",
          });
        } else {
          setProduct({
            data: null,
            status: "failed",
          });
        }
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product.status === "succeeded" && product.data?.data) {
      // The same relations.
      const theSameRelations = {
        category: product.data.data.category?._id,
        subCategories: product.data.data.subCategories,
        underSubCategories: product.data.data.underSubCategories,
        brand: product.data.data.brand?._id,
      };

      dispatch(
        fetchProducts({
          item: "0",
          queryParams: {
            page: "1",
            limit: `${limitOfProducts(limits)}`,
            sort: `-sold,-ratingsAverage`,
            fields: productsFields,
            ...theSameRelations,
          },
        })
      );
    }
  }, [dispatch, product.data?.data, product.status]);

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
                    _id={product.data.data._id}
                    save={product.data.data.save}
                  />
                  <ProductInformation productInfo={product.data.data} />
                </>
              </section>
            </div>
          </div>
          <Products
            title={"PRODUCTS RELATED TO THIS ITEM"}
            status={products["0"].status}
            data={products["0"].data}
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
