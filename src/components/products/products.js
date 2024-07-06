import "./products.css";

import ProductsCard from "../productsCard/productsCard";
import ProductsCardSkeletion from "../productsCard/productsCardSkeletion";

export default function Products({ title, status, data }) {
  return status === "idle" || status === "loading" ? (
    <div className="products">
      <div className="container">
        <div className="ab">
          <h1 className="title">{title}</h1>
          <div className="ab_cards">
            {Array.from(new Array(10)).map((_, i) => {
              return <ProductsCardSkeletion key={i + 1} />;
            })}
          </div>
        </div>
      </div>
    </div>
  ) : status === "succeeded" && Array.isArray(data.data) ? (
    <div className="products">
      <div className="container">
        <div className="ab">
          <h1 className="title">{title}</h1>
          <div className="ab_cards">
            {data.data.map((item, i) => {
              return (
                <ProductsCard
                  key={i + 1}
                  _id={item._id}
                  title={item.title}
                  price={item.price}
                  priceAfterDiscount={item.priceAfterDiscount}
                  imageCover={item.imageCover}
                  quantity={item.quantity}
                  sold={item.sold}
                  ratingsAverage={item.ratingsAverage}
                  ratingsQuantity={item.ratingsQuantity}
                  save={item.save}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
