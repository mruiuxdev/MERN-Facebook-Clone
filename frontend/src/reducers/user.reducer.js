const userReducer = (state = null, action) => {
  switch (action.payload) {
    case "LOGIN":
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
