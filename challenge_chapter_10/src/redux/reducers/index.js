import { combineReducers } from "redux";
import usersLogin from "./profile/usersLogin_reducers";
import authReducer from "./auth/auth.reducer";
import gameReducer from "./game/game.reducer";

export default combineReducers({
  authReducer,
  usersLogin,
  gameReducer,
  //masukkan semua reducer ke sini
});
