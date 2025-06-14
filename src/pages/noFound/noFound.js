import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { HOME } from "../../routes";
import WentWrong from "../../components/wentWrong/wentWrong";

export default function NoFound() {
  return (
    <>
      <NavBar />
      <WentWrong
        srcImage={require("../../imgs/error-404.png")}
        title="Oops! The page you are looking for does not exist."
        paragraph="It may have been removed, or the link you followed may be broken.\nPlease check the URL or return to the home page."
        buttonContent="BACK TO HOME PAGE"
        to={HOME}
      />
      <Footer />
    </>
  );
}
