import { useEffect } from "react";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import "./products.css";

import ProductsCard from "../productsCard/productsCard";
import ProductsCardSkeletion from "../productsCard/productsCardSkeletion";

export default function Products({
  title,
  status,
  data,
  gridTemplateColumns = {},
  limitOfProducts,
  paginationResults,
  currentPage,
  onPageChange,
}) {
  const AbCards = styled.div`
    display: grid;
    grid-template-columns: repeat(${gridTemplateColumns.phome || 2}, 1fr);
    gap: 7.5px;
    /* sm	*/
    @media (min-width: 640px) {
      grid-template-columns: repeat(${gridTemplateColumns.sm || 3}, 1fr);
    }
    /* md	*/
    @media (min-width: 1024px) {
      grid-template-columns: repeat(${gridTemplateColumns.md || 4}, 1fr);
    }
    /* lg	*/
    @media (min-width: 1024px) {
      grid-template-columns: repeat(${gridTemplateColumns.lg || 5}, 1fr);
      gap: 15px;
    }
  `;

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      {status === "idle" || status === "loading" ? (
        <div className="products">
          <div className="container">
            <div className="ab">
              {title.length > 0 ? <h1 className="title">{title}</h1> : null}
              <AbCards>
                {Array.from(new Array(limitOfProducts)).map((_, i) => {
                  return <ProductsCardSkeletion key={i + 1} />;
                })}
              </AbCards>
            </div>
          </div>
        </div>
      ) : status === "succeeded" && Array.isArray(data.data) ? (
        <div className="products">
          <div className="container">
            <div className="ab">
              {title.length > 0 ? <h1 className="title">{title}</h1> : null}
              <AbCards>
                {data.data.map((items, i) => {
                  // Get index of object that has the smallest price from sizes array.
                  let minPriceIndex = 0;
                  items.sizes.forEach((item, index) => {
                    if (item.price < items.sizes[minPriceIndex].price) {
                      minPriceIndex = index;
                    }
                  });
                  return (
                    <ProductsCard
                      key={i + 1}
                      _id={items._id}
                      title={items.title}
                      price={items.price ?? items?.sizes[minPriceIndex]?.price}
                      priceAfterDiscount={
                        items.priceAfterDiscount ??
                        items?.sizes[minPriceIndex]?.priceAfterDiscount
                      }
                      imageCover={items.imageCover}
                      quantity={
                        items.quantity ?? items?.sizes[minPriceIndex]?.quantity
                      }
                      sold={items.sold}
                      ratingsAverage={items.ratingsAverage}
                      ratingsQuantity={items.ratingsQuantity}
                      save={items.save}
                    />
                  );
                })}
              </AbCards>
            </div>

            {/* Pagination component */}
            {paginationResults?.numberOfPages > 1 && (
              <Pagination
                count={paginationResults.numberOfPages}
                page={paginationResults.currentPage || currentPage}
                onChange={onPageChange}
                siblingCount={0}
                shape="rounded"
                size="large"
              />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
