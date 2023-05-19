import { 
  REGISTER_USER,
  LOGIN_USER,
  LOGIN_WITH_GOOGLE,
  RESET_PASSWORD
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

  // > State untuk action loginWithGoogle
  // => Kondisi awalnya adalah false
  loginWithGooleLoading: false,
  loginWithGoogleFulfilled: false,
  loginWithGoogleRejected: false,

  // > State untuk action loginWithGoogle
  // => Kondisi awalnya adalah false
  resetPasswordLoading: false,
  resetPasswordFulfilled: false,
  resetPasswordRejected: false,
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
        loginUserRejected: action.payload.errorMessage,
      }
    case LOGIN_WITH_GOOGLE:
      return {
        ...state,
        loginWithGooleLoading: action.payload.loading,
        loginWithGoogleFulfilled: action.payload.data,
        loginWithGoogleRejected: action.payload.errorMessage,
      }
    case RESET_PASSWORD:
      return {
        ...state,
        resetPasswordLoading: action.payload.loading,
        resetPasswordFulfilled: action.payload.data,
        resetPasswordRejected: action.payload.errorMessage,
      }
    default:
      return state;
  }
};

export default authReducer