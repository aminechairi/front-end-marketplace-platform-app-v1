import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import NavBar from "../../components/navBar/navBar";
import Products from "../../components/products/products";
import Footer from "../../components/footer/footer";

import useFetch from "../../hooks/useFetch";
import baseUrl from "../../config/config";
import cookieManager from "../../utils/cookieManager";
import limitOfProducts from "../../utils/limitOfProducts";
import { SAVES } from "../../routes";

// Limits according to media queries
const limits = [12, 12, 12, 19, 20, 20];

const Saves = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: saves, fetchData: fetchSaves } = useFetch();

  // Extract page number from URL query params or default to 1
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [triggeredByPagination, setTriggeredByPagination] = useState(false);

  useEffect(() => {
    const page = triggeredByPagination ? currentPage : initialPage;
    const JWTToken = `Bearer ${cookieManager("get", "JWTToken")}`;

    fetchSaves({
      url: `${baseUrl}/saves`,
      method: "get",
      params: {
        page: page.toString(),
        limit: `${limitOfProducts(limits)}`,
        fields: `productId`,
      },
      headers: {
        Authorization: JWTToken,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSaves, currentPage, initialPage]);

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
    for (let i = 0; i < saves.data.data.length; i++) {
      if (
        JSON.stringify(saves.data.data[i].productId) !==
        JSON.stringify({ save: true })
      ) {
        products.push(saves.data.data[i].productId);
      }
    }
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
