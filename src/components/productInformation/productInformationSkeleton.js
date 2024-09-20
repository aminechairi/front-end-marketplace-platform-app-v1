import "./productInformationSkeleton.css";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function ProductInformationSkeleton() {
  return (
    <div className="product_information_skeletion">
      <p className="relations">
        <span>Category</span>&nbsp;:&nbsp;
        <span>Home & Kitchen</span>
      </p>

      <h1 className="title">
        High-Power Blender 1500W Motor
      </h1>

      <p className="description">
        Experience ultimate blending with our High-Power Blender. Featuring a
        1500W motor and 8 adjustable speed settings, this blender is perfect for
        smoothies, soups, and more.
      </p>

      <div className="prices">
        <p className="price_2">
          <span className="price">250.00 USD</span>
          &nbsp; &nbsp;
          <span className="discount">-20%</span>
        </p>
      </div>

      <div className="r_rq_s_q">
        <div className="box">
          <h1 className="title">Ratings</h1>
          <section className="section_of_values">
            <p className="value">4.8</p>
          </section>
        </div>
        <div className="box">
          <h1 className="title">Ratings quantity</h1>
          <section className="section_of_values">
            <p className="value">1,250</p>
          </section>
        </div>
        <div className="box">
          <h1 className="title">Sold</h1>
          <section className="section_of_values">
            <p className="value">750</p>
          </section>
        </div>
        <div className="box">
          <h1 className="title">Quantity</h1>
          <section className="section_of_values">
            <p className="value">50</p>
          </section>
        </div>
      </div>

      <p className="relations">
        <span>Brand</span>&nbsp;:&nbsp;<span>BlendMaster</span>
      </p>

      <p className="relations">
        <span>Color</span>&nbsp;:&nbsp;<span>Red</span>
      </p>

      <div className="q_a_s">
        <div className="quantity">
          <button className="button">
            <RemoveIcon className="icon" />
          </button>
          <div className="number">1</div>
          <button className="button">
            <AddIcon className="icon" />
          </button>
        </div>
        <button className="add_to_cart">Add to cart</button>
      </div>
    </div>
  );
}

export default ProductInformationSkeleton;
