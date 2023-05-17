import axios from "axios";

// > constact vairbale
// => akan dikirim kedalam reducer dalam case ini 
// => ./src/redux/reducers/auth/auth.reducer.js
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";

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
      const response = await axios.post('http://localhost:3000/api/auth/register', data);

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

export const loginUser = (data) => {
  return async (dispatch) => {
    // > kondisi pending
    dispatch({
      type: LOGIN_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // > kondisi fulfilled
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', data);

      dispatch({
        type: LOGIN_USER,
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
        type: LOGIN_USER,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};

