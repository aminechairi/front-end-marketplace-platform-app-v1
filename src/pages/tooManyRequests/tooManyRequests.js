import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import WentWrong from "../../components/wentWrong/wentWrong";

function TooManyRequests() {
  return (
    <>
      <NavBar />
      <WentWrong
        srcImage={require("../../imgs/too many requests.png")}
        title="Oops! Too many requests. Please try again later."
        paragraph="It seems like you have made too many requests in a short period of time. Please wait a moment before trying again."
        buttonContent="TRY AGAIN LATER"
        to="/"
      />
      <Footer />
    </>
  );
}

export default TooManyRequests;
