import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import NavBar from "../../components/navBar/navBar";
import Products from "../../components/products/products";
import Footer from "../../components/footer/footer";

import useFetch from "../../hooks/useFetch";
import baseUrl from "../../config/config";
import cookieManager from "../../utils/cookieManager";
import limitOfProducts from "../../utils/limitOfProducts";
import { HOME, FAVORITES } from "../../routes";
import WentWrong from "../../components/wentWrong/wentWrong";

// Limits according to media queries
const limits = [12, 12, 12, 19, 20, 20];

const Favorites = () => {
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
      url: `${baseUrl}/customer/favorites`,
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
    navigate(`${FAVORITES}?page=${value}`);
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
        <WentWrong 
          srcImage={require("../../imgs/break-up.png")}
          title="Oops! You haven't saved any products yet."
          paragraph="It seems like you haven't added any products to your favorites. Browse our collection and start saving your favorite items!"
          buttonContent="GO BACK TO HOME PAGE"
          to={HOME}
        />
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

export default Favorites;
