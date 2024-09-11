import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import NavBar from "../../components/navBar/navBar";
import Products from "../../components/products/products";
import Footer from "../../components/footer/footer";

import { fetchSaves } from "../../redux/savesSlice";
import limitOfProducts from "../../utils/limitOfProducts";
import { SAVES } from "../../routes";

// Limits according to media queries
const limits = [10, 10, 9, 10, 10, 10];

const Saves = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const saves = useSelector((state) => state.fetchSaves);

  // Extract page number from URL query params or default to 1
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [triggeredByPagination, setTriggeredByPagination] = useState(false);

  useEffect(() => {
    const page = triggeredByPagination ? currentPage : initialPage;
    dispatch(
      fetchSaves({
        page: page.toString(),
        limit: `${limitOfProducts(limits)}`,
        fields: `productId`,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, initialPage]);

  // Reset pagination trigger after successful fetch
  useEffect(() => {
    if (saves?.status === "succeeded") {
      setTriggeredByPagination(false);
    }
  }, [saves]);

  const handlePageChange = (_, value) => {
    setTriggeredByPagination(true);
    setCurrentPage(value);
    navigate(`${SAVES}?page=${value}`);
  };

  let products = [];
  if (saves.status === "succeeded" && Array.isArray(saves.data?.data)) {
    products = saves.data.data.map((item) => item.productId);
  }

  return (
    <>
      <NavBar />
      {saves.data?.data?.length === 0 && saves.status === "succeeded" ? (
        <div className="noFound">
          <div className="container">
            <div className="ab">
              <img
                src={require("../../imgs/break-up.png")}
                alt="No products found"
              />
              <h1>Ready to make a wish?</h1>
              <p>
                Start adding items you love to your wishlist by tapping on the
                heart icon
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Products
        title={"FAVORITES"}
          status={saves.status}
          data={{ data: products }}
          limitOfProducts={limitOfProducts(limits)}
          paginationResults={saves?.data?.paginationResults}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      <Footer />
    </>
  );
};

export default Saves;
