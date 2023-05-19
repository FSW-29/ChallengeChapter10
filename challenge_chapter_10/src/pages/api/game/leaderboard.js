import { get, getDatabase, push, ref } from "firebase/database";
import firebase from "@/services/firebase";

export default async function LeaderboardApi(request, response) {
  try {
    // > instancae variable database
    // => kita ambil database dari setup database
    const database = getDatabase(firebase);

    // > cari table leaderboad dari firebase
    const leaderRef = ref(database, "leaderboard");
    const snapshot = await get(leaderRef);

    // > ambil seluruh data "leaderboad" dari db
    const leaderboards = [];
    snapshot.forEach((child) => {
      const childData = child.val();
      leaderboards.push({
        id: child.key,
        ...childData,
      });
    });

    return response.status(200).json({
      statusCode: 200,
      message: "Load Leaderboard Success!",
      data: leaderboards,
    });
    response.json(leaderboards.json());
  } catch (error) {
    return response.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
}
