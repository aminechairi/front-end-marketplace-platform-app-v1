import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";
import axios from "axios";

import "./search.css";

import Radio from "@mui/material/Radio";
import StarIcon from "@mui/icons-material/Star";
import NavBar from "../../components/navBar/navBar";
import Categories from "../../components/categories/categories";
import Products from "../../components/products/products";
import Footer from "../../components/footer/footer";
import { fetchProducts } from "../../redux/productsSlice";
import { productsFields } from "../../utils/specificFields";
import limitOfProducts from "../../utils/limitOfProducts";
import baseUrl from "../../config/config";

// Set product limits based on screen size
const productLimits = [12, 12, 12, 12, 16, 15];

// Search Component
function Search() {
  const { searchValue = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Redux store
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  const [subCategories, setSubCategories] = useState({
    data: null,
    status: "idle",
  });
  const [underSubCategories, setUnderSubCategories] = useState({
    data: null,
    status: "idle",
  });

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
  const currentCategory = queryParams.get("category") || undefined;
  const currentSubCategory = queryParams.get("subcategory") || undefined;
  const currentUnderSubCategory =
    queryParams.get("undersubcategory") || undefined;
  const currentBrand = queryParams.get("brand") || undefined;

  // Refs for minimum and maximum price inputs
  const minPriceInputRef = useRef(null);
  const maxPriceInputRef = useRef(null);

  // State to track pagination and current page
  const [triggeredByPagination, setTriggeredByPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [category, setCategory] = useState(null);

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
          fields: productsFields,
          "ratingsAverage[gte]": currentMinRating,
          "price[gte]": currentMinPrice,
          "price[lte]": currentMaxPrice,
          category: currentCategory,
          subCategories: currentSubCategory,
          underSubCategories: currentUnderSubCategory,
          brand: currentBrand,
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

  // Hook to update image of header of category
  useEffect(() => {
    if (currentCategory && categories.data?.data) {
      const idOfCategory = currentCategory;
      const item = categories.data?.data.find(
        (item) => item._id === idOfCategory
      );
      if (item) setCategory(item);
    } else if (currentSubCategory && subCategories.data?.data) {
      const idOfSubCategory = currentSubCategory;
      const item = subCategories.data?.data.find(
        (item) => item._id === idOfSubCategory
      );
      if (item) setCategory(item);
    } else if (currentUnderSubCategory && underSubCategories.data?.data) {
      const idOfUnderSubCategory = currentUnderSubCategory;
      const item = underSubCategories.data?.data.find(
        (item) => item._id === idOfUnderSubCategory
      );
      if (item) setCategory(item);
    }
  }, [
    currentCategory,
    currentSubCategory,
    currentUnderSubCategory,
    categories.data?.data,
    subCategories.data?.data,
    underSubCategories.data?.data,
  ]);

  // Hook to fetch subcategories or under subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      if (currentCategory) {
        setSubCategories({
          data: null,
          status: "loading",
        });

        try {
          const response = await axios.get(`${baseUrl}/subcategories`, {
            params: {
              page: 1,
              limit: 40,
              category: currentCategory,
              fields: "_id,name,image",
              sort: "createdAt",
            },
          });

          setSubCategories({
            data: response.data,
            status: "succeeded",
          });
        } catch (err) {
          if (err.response?.data) {
            setSubCategories({
              data: err.response?.data,
              status: "succeeded",
            });
          } else {
            setSubCategories({
              data: null,
              status: "failed",
            });
          }
        }
      } else if (currentSubCategory) {
        setUnderSubCategories({
          data: null,
          status: "loading",
        });

        try {
          const response = await axios.get(`${baseUrl}/undersubcategories`, {
            params: {
              page: 1,
              limit: 40,
              subCategory: [currentSubCategory],
              fields: "_id,name,image",
              sort: "createdAt",
            },
          });

          setUnderSubCategories({
            data: response.data,
            status: "succeeded",
          });
        } catch (err) {
          if (err.response?.data) {
            setUnderSubCategories({
              data: err.response?.data,
              status: "succeeded",
            });
          } else {
            setUnderSubCategories({
              data: null,
              status: "failed",
            });
          }
        }
      } else return;
    };

    fetchCategories();
  }, [currentCategory, currentSubCategory]);

  return (
    <>
      <NavBar />
      <div className="filter_products">
        {category && (
          <div
            className="header_of_category"
            style={{
              backgroundImage: `url(${category?.image})`,
            }}
          >
            <div className="bg">
              <div className="container">
                <h1 className="title">{category?.name}</h1>
              </div>
            </div>
          </div>
        )}

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
              {/* Display search results or "No Results" message */}
              {(products[0]?.data?.data?.length === 0 ||
                products[0]?.data?.status) &&
              products[0].status === "succeeded" ? (
                <div className="not_Found_filter_products">
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
              ) : (
                <Products
                  title={
                    searchValue
                      ? `SEARCH RESULTS FOR: "${searchValue}"`
                      : "SEARCH RESULTS:"
                  }
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
      </div>
      <Footer />
    </>
  );
}

export default Search;
