import { get, getDatabase, push, ref } from "firebase/database";
import firebase from "@/services/firebase";

export default async function GameListApi(request, response) {
  try {
    // > instancae variable database
    // => kita ambil database dari setup database
    const database = getDatabase(firebase);

    // > cari table game dari firebase
    const gamesRef = ref(database, "game");
    const snapshot = await get(gamesRef);

    // > ambil seluruh data "game" dari db
    const games = [];
    snapshot.forEach((child) => {
      const childData = child.val();
      games.push({
        id: child.key,
        ...childData,
      });
    });

    return response.status(200).json({
      statusCode: 200,
      message: "Load Game Success!",
      data: games,
    });
    response.json(games.json());
  } catch (error) {
    return response.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
}

// const fecthDataGame = async () => {
//   try {
//     const databaseFirebase = await get(child(ref(database), "game"));
//     arrayGame = Object.values(databaseFirebase.val());
//     //setArrGame(arrayGame);
//     console.log(arrayGame, "====>b");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default async function fecthDataGame(req, res) {
//   // const data = await fetch(baseUrl);
//   // const result = await data.json();
//   const databaseFirebase = await get(child(ref(database), "game"));
//   const data = await fetch(databaseFirebase);
//   arrayGame = Object.values(data.val());
//   const result = await arrayGame.json();

//   console.log(result);
//   //res.json(result);
// }
