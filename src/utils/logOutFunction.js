import store from "../redux/store";

import { deleteCookie } from "../redux/slices/cookiesSlice";
import { navigateTo } from "../utils/navigation";
import { LOGIN } from "../routes";

const logOutFunction = async () => {
  const dispatch = store.dispatch;
  await dispatch(deleteCookie({ name: "JWTToken" }));
  navigateTo(LOGIN);
};

export default logOutFunction;
