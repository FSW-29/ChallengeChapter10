import { combineReducers } from "redux";
import { usersLogin } from "./usersLogin_reducers";
import authReducer from "./auth/auth.reducer";


export default combineReducers({
    authReducer,
    usersLogin
    //masukkan semua reducer ke sini
})
