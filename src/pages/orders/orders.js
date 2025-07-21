import "./orders.css";
import NavBar from "../../components/navBar/navBar";
import WentWrong from "../../components/wentWrong/wentWrong";
import Footer from "../../components/footer/footer";

import { HOME } from "../../routes";

export default function Orders() {
  return (
    <>
      <NavBar />
      <WentWrong
        srcImage={require("../../imgs/empty-orders.png")}
        title="No Orders Yet"
        paragraph="Looks like you haven't placed any orders yet.\nStart shopping now and fill it with your favorite products!"
        buttonContent="BACK TO HOME PAGE"
        to={HOME}
      />
      <Footer />
    </>
  );
}
