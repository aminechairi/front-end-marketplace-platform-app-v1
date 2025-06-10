import { authLogOut } from "../redux/authSlice";
import { LOGIN } from "../routes";

const logOutFunction = async (dispatch, navigate) => {
  const resultAction = await dispatch(authLogOut());
  if (authLogOut.fulfilled.match(resultAction)) {
    navigate(LOGIN);
  }
};

export default logOutFunction;
