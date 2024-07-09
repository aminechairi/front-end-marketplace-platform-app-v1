import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../../components/navBar/navBar";
import Products from "../../components/products/products";
import Footer from "../../components/footer/footer";

import { fetchSaves } from "../../redux/savesSlice";

const Saves = () => {
  const dispatch = useDispatch();
  const saves = useSelector((state) => state.fetchSaves);

  useEffect(() => {
    dispatch(fetchSaves());
  }, [dispatch]);

  let products = [];
  if (saves.status === "succeeded" && Array.isArray(saves.data?.data)) {
    products = saves.data.data.map((item) => item.productId);
  }

  const noProductsFound =
    saves.data?.data?.length === 0 && saves.status === "succeeded";

  return (
    <>
      <NavBar />
      {noProductsFound ? (
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
        <Products title="" status={saves.status} data={{ data: products }} />
      )}
      <Footer />
    </>
  );
};

export default Saves;
