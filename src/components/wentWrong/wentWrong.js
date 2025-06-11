import { Link } from "react-router-dom";

import "./wentWrong.css";

import ScrollToTop from "../../components/scrollToTop/scrollToTop";

const WentWrong = ({ srcImage, title, paragraph, buttonContent, to }) => {
  return (
    <div className="went_wrong">
      <div className="container">
        <div className="ab">
          <img src={srcImage} alt="" />
          <h1>{title}</h1>
          <p>{paragraph}</p>
          <ScrollToTop>
            <Link to={to}>
              <button className="buttom">{buttonContent}</button>
            </Link>
          </ScrollToTop>
        </div>
      </div>
    </div>
  );
};

export default WentWrong;
