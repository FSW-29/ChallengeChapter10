import { combineReducers } from "redux";
import  usersLogin from "./profile/usersLogin_reducers";
import authReducer from "./auth/auth.reducer";
import gameReducer from "./game/game.reducer";


export default combineReducers({
<<<<<<< HEAD
    authReducer,
    usersLogin
    //masukkan semua reducer ke sini
})
=======
  authReducer,
  gameReducer,
});
>>>>>>> abcb1e2ace82df900218c91dcb87ccd7f3615305
