import { Link } from "react-router-dom";

import "./wentWrong.css";

import ScrollToTop from "../../components/scrollToTop/scrollToTop";

const WentWrong = ({
  srcImage,
  title,
  paragraph,
  buttonContent,
  to,
  onClick,
}) => {
  return (
    <div className="went_wrong">
      <div className="container">
        <div className="ab">
          <img src={srcImage} alt="" />
          <h1>{title}</h1>
          <p>
            {paragraph.split("\\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>

          {to ? (
            <ScrollToTop>
              <Link to={to}>
                <button className="buttom">{buttonContent}</button>
              </Link>
            </ScrollToTop>
          ) : (
            <button className="buttom" onClick={onClick}>
              {buttonContent}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WentWrong;
