import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";

import "./search.css";

import Radio from "@mui/material/Radio";
import StarIcon from "@mui/icons-material/Star";
import NavBar from "../../components/navBar/navBar";
import Categories from "../../components/categories/categories";
import Products from "../../components/products/products";
import Footer from "../../components/footer/footer";

import useFetch from "../../hooks/useFetch";
import { productsFields } from "../../utils/specificFields";
import limitOfProducts from "../../utils/limitOfProducts";

// Set product limits based on screen size
const productLimits = [12, 12, 12, 12, 16, 15];

// Search Component
function Search() {
  const { searchValue = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Redux store
  const { data: products, fetchData: fetchProducts } = useFetch();

  const { data: subCategories, fetchData: fetchSubCategories } = useFetch();
  const { data: underSubCategories, fetchData: fetchUnderSubCategories } = useFetch();

  // Parse query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const currentMinRating = parseInt(queryParams.get("minRating")) || 0;
  const currentMinPrice = queryParams.get("minPrice") ? +queryParams.get("minPrice") : undefined;
  const currentMaxPrice = queryParams.get("maxPrice") ? +queryParams.get("maxPrice") : undefined;
  const currentCategory = queryParams.get("category") || undefined;
  const currentSubCategory = queryParams.get("subcategory") || undefined;
  const currentUnderSubCategory = queryParams.get("undersubcategory") || undefined;
  const currentBrand = queryParams.get("brand") || undefined;

  // Refs for minimum and maximum price inputs
  const minPriceInputRef = useRef(null);
  const maxPriceInputRef = useRef(null);

  // State to track pagination and current page
  const [triggeredByPagination, setTriggeredByPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Load products functionality
  const loadProducts = async () => {
    const page = triggeredByPagination ? currentPage : initialPage; // Determine the correct page

    fetchProducts({
      url: `/products`,
      method: "get",
      params: {
        page: page.toString(),
        limit: `${limitOfProducts(productLimits)}`,
        search: searchValue,
        sort: currentMinRating || currentMinPrice || currentMaxPrice ? undefined : `-sold,-ratingsAverage`,
        fields: productsFields,
        "ratingsAverage[gte]": currentMinRating,
        "price[gte]": currentMinPrice,
        "price[lte]": currentMaxPrice,
        category: currentCategory,
        subCategories: currentSubCategory,
        underSubCategories: currentUnderSubCategory,
        brand: currentBrand,
      },
    });
  };

  // useEffect hook to fetch products
  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchProducts,
    currentPage,
    searchValue,
    initialPage,
    currentMinRating,
    currentMinPrice,
    currentMaxPrice,
    currentCategory,
    currentSubCategory,
    currentUnderSubCategory,
    currentBrand,
  ]);

  // Debounced function to handle price changes (delay added to avoid excessive updates)
  const debouncedHandlePriceChange = _.debounce(() => {
    // Set or delete query parameters for price
    if (minPriceInputRef.current.value) {
      queryParams.set("minPrice", +minPriceInputRef.current.value);
    } else {
      queryParams.delete("minPrice");
    }
    if (
      maxPriceInputRef.current.value &&
      maxPriceInputRef.current.value > +minPriceInputRef.current.value
    ) {
      queryParams.set("maxPrice", +maxPriceInputRef.current.value);
    } else {
      queryParams.delete("maxPrice");
    }

    queryParams.set("page", 1);
    navigate(`/search/${searchValue}?${queryParams.toString()}`);
  }, 500);

  // useEffect hook to initialize price input values based on current URL parameters
  useEffect(() => {
    minPriceInputRef.current.value = currentMinPrice ?? "";
    maxPriceInputRef.current.value = currentMaxPrice ?? "";
  }, [currentMinPrice, currentMaxPrice]);

  // Function to handle rating filter changes
  const handleRatingChange = (rating) => {
    queryParams.set("minRating", rating === currentMinRating ? 0 : rating);
    queryParams.set("page", 1); // Reset page to 1
    navigate(`/search/${searchValue}?${queryParams.toString()}`);
  };

  // Function to handle pagination change
  const handlePageChange = (_, value) => {
    setTriggeredByPagination(true); // Indicate pagination was triggered
    setCurrentPage(value); // Update current page state
    queryParams.set("page", value); // Set new page in query parameters
    navigate(`/search/${searchValue}?${queryParams.toString()}`); // Navigate with updated page
  };

  // useEffect hook to reset pagination flag when products have loaded
  useEffect(() => {
    if (products?.status === "succeeded") {
      setTriggeredByPagination(false); // Reset pagination trigger once products are successfully loaded
    }
  }, [products]);

  // Function to go back to the previous page
  const goBack = () => navigate(-1);

  // Hook to fetch subcategories or under subcategories
  useEffect(() => {
    if (currentCategory) {
      fetchSubCategories({
        url: `/subcategories`,
        method: "get",
        params: {
          page: 1,
          limit: 40,
          category: currentCategory,
          fields: "_id,name,image",
          sort: "createdAt",
        },
      });
    } else if (currentSubCategory) {
      fetchUnderSubCategories({
        url: `/undersubcategories`,
        method: "get",
        params: {
          page: 1,
          limit: 40,
          subCategory: [currentSubCategory],
          fields: "_id,name,image",
          sort: "createdAt",
        },
      });
    } else return;
  }, [
    currentCategory,
    fetchSubCategories,
    currentSubCategory,
    fetchUnderSubCategories,
  ]);

  return (
    <>
      <NavBar />
      <div className="filter_products">
        {/* <div className="header_of_category">
          <div className="bg">
            <div className="container">
              <h1 className="title">Search</h1>
            </div>
          </div>
        </div> */}

        {/* DIiplay sub categories or under sub categories */}
        {currentCategory && (
          <Categories
            title={"SUB CATEGORIES"}
            status={subCategories.status}
            data={subCategories.data}
            queryParam={"subcategory"}
          />
        )}
        {currentSubCategory && (
          <Categories
            title={"UNDER SUB CATEGORIES"}
            status={underSubCategories.status}
            data={underSubCategories.data}
            queryParam={"undersubcategory"}
          />
        )}

        <div className="main_of_products">
          <div className="container">
            <div className="ab">
              <div className="lists_of_search">
                {/* Price Filter */}
                <div className="price">
                  <h1 className="title_of_lists">Pricing</h1>
                  <div className="ab">
                    <input
                      className="input"
                      type="number"
                      placeholder="FROM"
                      ref={minPriceInputRef}
                      min={0}
                      onChange={() => debouncedHandlePriceChange()} // Handle price input changes with debounce
                    />
                    <input
                      className="input"
                      type="number"
                      placeholder="TO"
                      ref={maxPriceInputRef}
                      min={0}
                      onChange={() => debouncedHandlePriceChange()} // Handle price input changes with debounce
                    />
                  </div>
                </div>
                {/* Ratings Filter */}
                <div className="ratings">
                  <h1 className="title_of_lists">Ratings</h1>
                  <ul>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <li key={rating}>
                        <Radio
                          type="checkbox"
                          id={`rating_radio_${rating}`}
                          size="small"
                          className="input"
                          checked={currentMinRating === rating} // Highlight selected rating
                          onChange={() => handleRatingChange(rating)} // Handle rating change
                          sx={{
                            color: "var(--text-color)",
                            "&.Mui-checked": {
                              color: "var(--main-color)",
                            },
                          }}
                        />
                        <label
                          className="starts"
                          htmlFor={`rating_radio_${rating}`}
                        >
                          {/* Display rating with stars */}
                          {Array.from({ length: 5 }).map((_, index) => (
                            <StarIcon
                              className={`icon ${
                                index < rating ? "active" : ""
                              }`} // Highlight active stars
                              key={index}
                            />
                          ))}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {products.status === "loading" && (
                <Products
                  title={searchValue ? `SEARCH RESULTS FOR: "${searchValue}"` : ""}
                  status={products?.status}
                  data={products?.data}
                  gridTemplateColumns={{ lg: 3, xlg: 4 }} // Grid layout for products
                  limitOfProducts={limitOfProducts(productLimits)} // Limit number of products displayed
                />
              )}

              {products.status === "succeeded" &&
                products?.data?.data?.length === 0 && (
                  <div className="not_Found_filter_products">
                    <div className="ab">
                      <img src={require("../../imgs/no-results.png")} alt="" />
                      <h1>No result found.</h1>
                      <p>
                        Try searching for something else or go back to the
                        previous page.
                      </p>
                      <button className="buttom" onClick={goBack}>
                        GO BACK
                      </button>
                    </div>
                  </div>
                )}

              {products.status === "succeeded" &&
                products?.data?.data?.length > 0 && (
                  <Products
                    title={
                      searchValue ? `SEARCH RESULTS FOR: "${searchValue}"` : ""
                    }
                    status={products?.status}
                    data={products?.data}
                    gridTemplateColumns={{ lg: 3, xlg: 4 }} // Grid layout for products
                    limitOfProducts={limitOfProducts(productLimits)} // Limit number of products displayed
                    paginationResults={products?.data?.paginationResults}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )}

              {products.status === "failed" && (
                <div className="not_Found_filter_products">
                  <div className="ab">
                    <img src={require("../../imgs/went wrong.png")} alt="" />
                    <h1>something went wrong.</h1>
                    <p>
                      We couldn't retrieve the products Please try again later.
                    </p>
                    <button className="buttom" onClick={loadProducts}>
                      TRY AGAIN
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Search;
