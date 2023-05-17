import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import gameReducer from "./game/game.reducer";

export default combineReducers({
  authReducer,
  gameReducer,
});
