import firebase from "@/services/firebase";
import { getDatabase, ref, push, get } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default async function LoginGoogle(request, response) {
  try {
    const loginResult = request.headers;
    const dataBody = request.body;
    // console.info(loginResult['x-api-key'], 'header ku');
    // console.info(dataBody, '=> dari body');

    // > proses auth
    // const auth = getAuth(firebase);
    // const provider = new GoogleAuthProvider();
    // const loginResult = await signInWithPopup(auth, provider);
    // console.info(loginResult, '=> hasil di api login-google');

    // > instancae variable database
    // => kita ambil database dari setup database
    const database = getDatabase(firebase);
  
    // > cari table users dari firebase
    const usersRef = ref(database, "users");
    const snapshot = await get(usersRef);
  
    // > ambil seluruh data "users" dari db
    const users = [];
    snapshot.forEach((child) => {
      const childData = child.val();
      users.push({
        id: child.key,
        ...childData
      });
    });

    const isEmailExists = users.find((user) => user.email === dataBody.email);
    console.info(isEmailExists, '=> email ditemukan');

    if (!isEmailExists) {
      // > get user id, username, and email
      const idUser = loginResult['x-api-key'];
      const emailUser = dataBody.email;
      const name = dataBody.fullName;

      // > split name dan buat username
      const splitName = name.split(" ");
      const usernameUser = splitName[0].toLowerCase() + splitName[1].toLocaleLowerCase() + Math.floor(Math.random() * 1000);

      // > Simpan data user ini kedalam database 
      const database = getDatabase(firebase);
      const dataRef = ref(database, "users");
      await push(dataRef, {
        id: idUser,
        email: emailUser,
        username: usernameUser,
        password: "0n3ucoSxNHHYLyIq9qid0z5UR",
        total_score: 0,
        biodata: "Belum Diatur",
        city: "Belum Diatur",
        social_media: "Belum Diatur",
      });

      response.status(201).json({
        statusCode: 201,
        message: 'Sukses Register dengan Google!',
        data: {
          id: idUser,
          email: emailUser,
          username: usernameUser,
          password: "0n3ucoSxNHHYLyIq9qid0z5UR",
          total_score: 0,
          biodata: "Belum Diatur",
          city: "Belum Diatur",
          social_media: "Belum Diatur",
        }
      });
    } else {
      return response.status(200).json({
        statusCode: 200,
        data: isEmailExists
      })
    }
  } catch (error) {
    console.error(error.message, '=> terjadi kesalahan di api login-google');
    response.status(400).json({
      statusCode: 400,
      message: `Terjadi Kesalahan ${error.message}`,
    });
  }
}

// export default async function LoginGoogle() {
//   try {
//     // > proses auth
//     const auth = getAuth(firebase);
//     const provider = new GoogleAuthProvider();
//     const loginResult = await signInWithPopup(auth, provider);
//     console.info(loginResult, '=> hasil di api login-google');

//     // > get user id, username, and email
//     const idUser = loginResult.user.uid;
//     const emailUser = loginResult.user.email;
//     const name = loginResult.user.displayName;

//     // > split name dan buat username
//     const splitName = name.split(" ");
//     const usernameUser = splitName[0].toLowerCase() + splitName[1].toLocaleLowerCase() + Math.floor(Math.random() * 1000);

//     // > Simpan data user ini kedalam database 
//     const database = getDatabase(firebase);
//     const dataRef = ref(database, "users");
//     await push(dataRef, {
//       id: idUser,
//       email: emailUser,
//       username: usernameUser,
//       password: "0n3ucoSxNHHYLyIq9qid0z5UR",
//       total_score: 0,
//       biodata: "Belum Diatur",
//       city: "Belum Diatur",
//       social_media: "Belum Diatur",
//     });
//     console.info('Sukses Regiser dengan Google!');
//   } catch (error) {
//     return error.message;
//     console.info(error.message, '=> terjadi kesalahan di api login-google');
//   }
// }