import { REGISTER_USER } from "@/redux/actions/auth.action";

const initialState = {
  // > State untuk action REGISTER_USE
  // => Kondisi awalnya adalah false
  registerUserLoading: false,
  registerUserFulfilled: false,
  registerUserRejected: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registerUserLoading: action.payload.loading,
        registerUserFulfilled: action.payload.data,
        registerUserRejected: action.payload.errorMessage
      }
    default:
      return state;
  }
};

export default authReducer