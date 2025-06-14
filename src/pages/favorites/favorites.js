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

  const { data: favorites, fetchData: fetchFavorites } = useFetch();

  // Extract page number from URL query params or default to 1
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [triggeredByPagination, setTriggeredByPagination] = useState(false);

  useEffect(() => {
    const page = triggeredByPagination ? currentPage : initialPage;
    const JWTToken = `Bearer ${cookieManager("get", "JWTToken")}`;

    fetchFavorites({
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
  }, [fetchFavorites, currentPage, initialPage]);

  // Reset pagination trigger after successful fetch
  useEffect(() => {
    if (favorites?.status === "succeeded") {
      setTriggeredByPagination(false);
    }
  }, [favorites]);

  const handlePageChange = (_, value) => {
    setTriggeredByPagination(true);
    setCurrentPage(value);
    navigate(`${FAVORITES}?page=${value}`);
  };

  let products = [];
  if (favorites.status === "succeeded" && Array.isArray(favorites.data?.data)) {
    for (let i = 0; i < favorites.data.data.length; i++) {
      if (
        JSON.stringify(favorites.data.data[i].productId) !==
        JSON.stringify({ save: true })
      ) {
        products.push(favorites.data.data[i].productId);
      }
    }
  }

  if (favorites.status === "loading") {
    return (
      <>
        <NavBar />
        <Products
          title={"FAVORITES"}
          status={favorites.status}
          data={{ data: products }}
          limitOfProducts={limitOfProducts(limits)}
          paginationResults={favorites?.data?.paginationResults}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <Footer />
      </>
    );
  }

  if (favorites.status === "succeeded" && favorites.data?.data.length === 0) {
    return (
      <>
        <NavBar />
        <WentWrong
          srcImage={require("../../imgs/break-up.png")}
          title="Oops! You haven't saved any products yet."
          paragraph="It seems like you haven't added any products to your favorites.\nBrowse our collection and start saving your favorite items!"
          buttonContent="BACK TO HOME PAGE"
          to={HOME}
        />
        <Footer />
      </>
    );
  }

  if (favorites.status === "succeeded" && favorites.data?.data.length > 0) {
    return (
      <>
        <NavBar />
        <Products
          title={"FAVORITES"}
          status={favorites.status}
          data={{ data: products }}
          limitOfProducts={limitOfProducts(limits)}
          paginationResults={favorites?.data?.paginationResults}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <Footer />
      </>
    );
  }

  if (favorites.status === "failed") {
    return (
      <>
        <NavBar />
        <WentWrong
          srcImage={require("../../imgs/went wrong.png")}
          title="Something went wrong."
          paragraph="We couldn't retrieve your favorites.\nPlease try again later."
          buttonContent="TRY AGAIN"
          onClick={() => {
            const page = triggeredByPagination ? currentPage : initialPage;
            const JWTToken = `Bearer ${cookieManager("get", "JWTToken")}`;

            fetchFavorites({
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
          }}
        />
        <Footer />
      </>
    );
  }
};

export default Favorites;
