import { useEffect } from "react";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";

import "./products.css";

import ProductsCard from "../productsCard/productsCard";
import ProductsCardSkeletion from "../productsCard/productsCardSkeletion";

const AbCards = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "gridTemplateColumns",
})`
  display: grid;
  grid-template-columns: repeat(${(props) => props.gridTemplateColumns.phome || 2}, 1fr);
  gap: 7.5px;
  /* sm */
  @media (min-width: 640px) {
    grid-template-columns: repeat(${(props) => props.gridTemplateColumns.sm || 3}, 1fr);
  }
  /* md */
  @media (min-width: 768px) {
    grid-template-columns: repeat(${(props) => props.gridTemplateColumns.md || 3}, 1fr);
  }
  /* lg */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(${(props) => props.gridTemplateColumns.lg || 4}, 1fr);
  }
  /* xlg */
  @media (min-width: 1280px) {
    grid-template-columns: repeat(${(props) => props.gridTemplateColumns.xlg || 5}, 1fr);
    gap: 15px;
  }
  /* 2xl */
  @media (min-width: 1536px) {
    grid-template-columns: repeat(${(props) => props.gridTemplateColumns["2xl"] || 5}, 1fr);
  }
`;

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

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      {status === "loading" ? (
        <div className="products">
          <div className="container">
            <div className="ab">
              {title.length > 0 ? <h1 className="title">{title}</h1> : null}
              <AbCards gridTemplateColumns={gridTemplateColumns}>
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
              <AbCards gridTemplateColumns={gridTemplateColumns}>
                {data.data.map((item, i) => {
                  return (
                    <ProductsCard
                      key={i + 1}
                      _id={item._id}
                      title={item.title}
                      price={item.price}
                      priceBeforeDiscount={item.priceBeforeDiscount}
                      discountPercent={item.discountPercent}
                      imageCover={item.imageCover}
                      size={item.size}
                      quantity={item.quantity}
                      sold={item.sold}
                      ratingsAverage={item.ratingsAverage}
                      ratingsQuantity={item.ratingsQuantity}
                      isFavorite={item.isFavorite}
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
