import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import NavBar from "../../components/navBar/navBar";
import Products from "../../components/products/products";
import Footer from "../../components/footer/footer";
import { fetchProducts } from "../../redux/productsSlice";
import limitOfProducts from "../../utils/limitOfProducts";

// Limits according to media queries
const limits = [8, 8, 9, 8, 8, 8];

function Search() {
  const { searchValue } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  // Extract page number from URL query params or default to 1
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [triggeredByPagination, setTriggeredByPagination] = useState(false);

  const goBack = () => navigate(-1);

  // Fetch products when currentPage or searchValue changes
  useEffect(() => {
    const page = triggeredByPagination ? currentPage : initialPage;
    dispatch(
      fetchProducts({
        item: "0",
        queryParams: {
          page: page.toString(),
          limit: `${limitOfProducts(limits)}`,
          search: searchValue,
          sort: `-sold,-ratingsAverage`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, searchValue, initialPage]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Reset pagination trigger after successful fetch
  useEffect(() => {
    if (products[0]?.status === "succeeded") {
      setTriggeredByPagination(false);
    }
  }, [products]);

  const handlePageChange = (_, value) => {
    setTriggeredByPagination(true);
    setCurrentPage(value);
    navigate(`/search/${searchValue}?page=${value}`);
  };

  return (
    <>
      <NavBar />
      {products[0]?.data?.data?.length === 0 &&
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
        <>
          <Products
            title={""}
            status={products[0]?.status}
            data={products[0]?.data}
            gridTemplateColumns={{ lg: 4 }}
            limitOfProducts={limitOfProducts(limits)}
            paginationResults={products[0]?.data?.paginationResults}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
      <Footer />
    </>
  );
}

export default Search;
