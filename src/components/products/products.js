import "./products.css";

import ProductsCard from "../productsCard/productsCard";
import ProductsCardSkeletion from "../productsCard/productsCardSkeletion";

export default function Products({ title, status, data }) {
  return status === "idle" || status === "loading" ? (
    <div className="products">
      <div className="container">
        <div className="ab">
          {title.length > 0 ? <h1 className="title">{title}</h1> : null}
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
          {title.length > 0 ? <h1 className="title">{title}</h1> : null}
          <div className="ab_cards">
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
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
