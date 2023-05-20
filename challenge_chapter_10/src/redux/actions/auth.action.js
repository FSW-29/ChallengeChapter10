import axios from "axios";


// > constact vairbale
// => akan dikirim kedalam reducer dalam case ini 
// => ./src/redux/reducers/auth/auth.reducer.js
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const LOGIN_SUCCESS_2 = "LOGIN_SUCCESS_2";

export const registerUser = (data) => {
  return async (dispatch) => {
    // > Kondisi loading (pending)
    dispatch({
      type: REGISTER_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // => kondisi fulfilled
    try {
      const response = await axios.post('/api/auth/register', data);

      dispatch({
        type: REGISTER_USER,
        payload: {
          loading: false,
          data: response.data,
          errorMessage: false,
        },
      });
    } 
    // => kondisi rejected
    catch (error) {
      dispatch({
        type: REGISTER_USER,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
}

// export const loginUser = (data) => {
//   return async (dispatch) => {
//     // > kondisi pending
//     dispatch({
//       type: LOGIN_USER,
//       payload: {
//         loading: true,
//         data: false,
//         errorMessage: false,
//       },
//     });

//     // > kondisi fulfilled
//     try {
//       const response = await axios.post('/api/auth/login', data);

//       dispatch({
//         type: LOGIN_USER,
//         payload: {
//           loading: false,
//           data: response.data,
//           errorMessage: false,
//         },
//       });
//     }
//     // > kondisi rejected 
//     catch (error) {
//       dispatch({
//         type: LOGIN_USER,
//         payload: {
//           loading: false,
//           data: false,
//           errorMessage: error.message,
//         },
//       });
//     }
//   };
// };

export const newLoginUser = (data) => {
  console.log(data, 'data dari action');
  return {
    type : LOGIN_SUCCESS_2,
    payload : data
  };
};

export const failedLogin = (data) => {
  console.info(data, 'data dari action failedLogin');
  return {
    type : "LOGIN_FAILED",
    payload : data
  }
}

export const isLoading = (data) => {
  console.info(data, 'data dari action isLoading');
  return {
    type : "IS_LOADING",
    payload : data
  };
};

export const loginWithGoogle = (data) => {
  return async (dispatch) => {
    // > Kondisi loading
   dispatch({
    type: LOGIN_WITH_GOOGLE,
    payload: {
      loading: true,
      data: false,
      errorMessage: false
    },
   });

    // > Kondisi fulfilled
    try {
      const response = await axios.post('/api/auth/login-google', data, {
        headers: {
          'x-api-key': data.localId
        }
      });
      dispatch({
        type: LOGIN_WITH_GOOGLE,
        payload: {
          loading: false,
          data: response.data,
          errorMessage: false
        },
      });
    } 
    // > Kondisi rejected
    catch (error) {
      dispatch({
        type: LOGIN_WITH_GOOGLE,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message
        },
      });
    }
  };
};

export const newLoginGoogle = (data) => {
  console.log(data, 'data dari action newLoginGoogle');
  return {
    type : "LOGIN_SUCCESS_3",
    payload : data
  };
};

export const resetPassword = (data) => {
  return async (dispatch) => {
    // > kondisi pending
    dispatch({
      type: RESET_PASSWORD,
      payload: {
        loading: true,
        data: false,
        errorMessage: false
      },
    });

    // > kondisi fulfilled
    try { 
      const response = await axios.put('/api/auth/reset-password', data);
      dispatch({
        type: RESET_PASSWORD,
        payload: {
          loading: false,
          data: response.data,
          errorMessage: false,
        },
      });
    } 
    // > kondisi rejected
    catch (error) {
      dispatch({
        type: RESET_PASSWORD,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};