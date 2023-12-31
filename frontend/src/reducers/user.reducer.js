import Cookies from "js-cookie";

const userReducer = (
  state = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  action
) => {
  switch (action.payload) {
    case "LOGIN":
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
