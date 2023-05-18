export const gameList = (data) => {
  return {
    type: "GAME_LIST",
    payload: data,
  };
};

export const gameRacing = (data) => {
  return {
    type: "GAME_RACING",
    payload: data,
  };
};

export const gamePuzzle = (data) => {
  return {
    type: "GAME_PUZZLE",
    payload: data,
  };
};

export const gameAction = (data) => {
  return {
    type: "GAME_ACTION",
    payload: data,
  };
};

export const gameNew = (data) => {
  return {
    type: "GAME_NEW",
    payload: data,
  };
};

export const gameDetail = (data) => {
  return {
    type: "GAME_DETAIL",
    payload: data,
  };
};
