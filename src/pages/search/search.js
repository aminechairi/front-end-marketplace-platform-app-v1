import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "../../components/navBar/navBar";
import Products from "../../components/products/products";
import Footer from "../../components/footer/footer";
import { fetchProducts } from "../../redux/productsSlice";

function Search() {
  const { searchValue } = useParams();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(
      fetchProducts({
        item: "0",
        queryParams: {
          search: `${searchValue}`,
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
  }, [dispatch, searchValue]);

  return (
    <>
      <NavBar />
      {products[0].data?.data?.length === 0 &&
      products[0].status === "succeeded" ? (
        <div className="noFound">
          <div className="container">
            <div className="ab">
              <img src={require("../../imgs/search.png")} alt="" />
              <h1>We couldn't find what you were looking for</h1>
              <p>
                Keep calm and search again. We have SO many other products that
                you will like!
              </p>
              <button className="buttom" onClick={goBack}>
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Products
          title={""}
          status={products["0"].status}
          data={products["0"].data}
        />
      )}
      <Footer />
    </>
  );
}

export default Search;
