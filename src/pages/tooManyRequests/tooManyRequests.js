import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";

function TooManyRequests() {
  return (
    <>
      <NavBar />
      <div className="noFound">
        <div className="container">
          <div className="ab">
            <img src={require("../../imgs/warning.png")} alt="" />
            <h1>Too many requests, please try again later.</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TooManyRequests;
