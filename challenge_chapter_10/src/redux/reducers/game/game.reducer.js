const initialState = {
  gameListData: [],
  gameListRacing: [],
  gameListPuzzle: [],
  gameListAction: [],
  gameListNew: [],
  gameDetail: [],
  gameLeaderboard: [],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GAME_LIST":
      return {
        ...state,
        gameListData: action.payload,
      };
    case "GAME_RACING":
      return {
        ...state,
        gameListRacing: action.payload,
      };
    case "GAME_PUZZLE":
      return {
        ...state,
        gameListPuzzle: action.payload,
      };
    case "GAME_ACTION":
      return {
        ...state,
        gameListAction: action.payload,
      };
    case "GAME_NEW":
      return {
        ...state,
        gameListNew: action.payload,
      };
    case "GAME_DETAIL":
      return {
        ...state,
        gameDetail: action.payload,
      };
    case "GAME_LEADERBOARD":
      return {
        ...state,
        gameLeaderboard: action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
