import { 
  REGISTER_USER,
  LOGIN_USER
} from "@/redux/actions/auth.action";

const initialState = {
  // > State untuk action registerUser
  // => Kondisi awalnya adalah false
  registerUserLoading: false,
  registerUserFulfilled: false,
  registerUserRejected: false,

  // > State untuk action registerUser
  // => kondisi awalnya adalah false
  loginUserLoading: false,
  loginUserFulfilled: false,
  loginUserRejected: false,
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
    case LOGIN_USER:
      return {
        ...state, 
        loginUserLoading: action.payload.loading,
        loginUserFulfilled: action.payload.data,
        loginUserRejected: action.payload.errorMessage
      }
    default:
      return state;
  }
};

export default authReducer