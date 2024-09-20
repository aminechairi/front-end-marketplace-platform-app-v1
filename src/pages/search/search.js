import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";

import "./search.css";

import Radio from "@mui/material/Radio";
import StarIcon from "@mui/icons-material/Star";
import NavBar from "../../components/navBar/navBar";
import Products from "../../components/products/products";
import Footer from "../../components/footer/footer";
import { fetchProducts } from "../../redux/productsSlice";
import limitOfProducts from "../../utils/limitOfProducts";

// Set product limits based on screen size
const productLimits = [12, 12, 12, 12, 16, 16];

// Search Component
function Search() {
  const { searchValue } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get products state from Redux store
  const products = useSelector((state) => state.products);

  // Parse query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const currentMinRating = parseInt(queryParams.get("minRating")) || 0;
  const currentMinPrice = queryParams.get("minPrice")
    ? +queryParams.get("minPrice")
    : undefined;
  const currentMaxPrice = queryParams.get("maxPrice")
    ? +queryParams.get("maxPrice")
    : undefined;

  // Refs for minimum and maximum price inputs
  const minPriceInputRef = useRef(null);
  const maxPriceInputRef = useRef(null);

  // State to track pagination and current page
  const [triggeredByPagination, setTriggeredByPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // useEffect hook to fetch products
  useEffect(() => {
    const page = triggeredByPagination ? currentPage : initialPage; // Determine the correct page
    dispatch(
      fetchProducts({
        item: "0",
        queryParams: {
          page: page.toString(),
          limit: `${limitOfProducts(productLimits)}`,
          search: searchValue,
          sort:
            currentMinRating || currentMinPrice || currentMaxPrice
              ? undefined
              : `-sold,-ratingsAverage`,
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
          "ratingsAverage[gte]": currentMinRating,
          "price[gte]": currentMinPrice,
          "price[lte]": currentMaxPrice,
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    currentPage,
    searchValue,
    initialPage,
    currentMinRating,
    currentMinPrice,
    currentMaxPrice,
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
  }, 300);

  // useEffect hook to initialize price input values based on current URL parameters
  useEffect(() => {
    minPriceInputRef.current.value = +currentMinPrice ?? "";
    maxPriceInputRef.current.value = +currentMaxPrice ?? "";
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
    if (products[0]?.status === "succeeded") {
      setTriggeredByPagination(false); // Reset pagination trigger once products are successfully loaded
    }
  }, [products]);

  // Function to go back to the previous page
  const goBack = () => navigate(-1);

  return (
    <>
      <NavBar />
      <div className="search_compoent">
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
                            className={`icon ${index < rating ? "active" : ""}`} // Highlight active stars
                            key={index}
                          />
                        ))}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Display search results or "No Results" message */}
            {products[0]?.data?.data?.length === 0 &&
            products[0].status === "succeeded" ? (
              <div className="noFound">
                <div className="container">
                  <div className="ab">
                    <img src={require("../../imgs/search.png")} alt="" />{" "}
                    <h1>We couldn't find what you were looking for</h1>{" "}
                    <p>
                      Keep calm and search again. We have SO many other products
                      that you will like!
                    </p>
                    <button className="buttom" onClick={goBack}>
                      Continue shopping
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Products
                title={`SEARCH RESULTS FOR: "${searchValue}"`}
                status={products[0]?.status}
                data={products[0]?.data}
                gridTemplateColumns={{ lg: 3, xlg: 4 }} // Grid layout for products
                limitOfProducts={limitOfProducts(productLimits)} // Limit number of products displayed
                paginationResults={products[0]?.data?.paginationResults}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Search;
