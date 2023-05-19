import { get, getDatabase, push, ref } from "firebase/database";
import firebase from "@/services/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default async function RegisterAPI(request, response)  {
  try {
    const { 
      email,
      username,
      password,
      biodata,
      city,
      socialMedia
    } = request.body;

  
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
  
    const usernameExists = users.find((user) => {
      return user.username === username;
    });
    const emailExists = users.find((user) => {
      return user.email === email
    });

    console.info(usernameExists, emailExists, '=> data nih bos');
    console.info(users, '=> data users nih bos')
  
    // > Cek username dan email apabila sudah digunakan
    if (usernameExists) {
      return response.status(400).json({
        statusCode: 400,
        message: "Username has been used!"
      });
    }
  
    if (emailExists) {
      return response.status(400).json({
        statusCode: 400,
        message: "Email has been used!"
      });
    }
  
    // > Buat autentikasi
    const auth = getAuth(firebase);
    const createNewUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.info(createNewUser.user, '=> sukses register lur');
    console.info(createNewUser, '=> data create user');
  
    // > Simpan data user kedalam realtime db
    const dataRef = ref(database, "users");
    await push(dataRef, {
      id: createNewUser.user.uid,
      email: email,
      username: username,
      password: password,
      total_score: 0,
      biodata: biodata,
      city: city,
      social_media: socialMedia
    });
    console.info("Data berhasil disimpan di db");

    const data = {
      id: createNewUser.user.uid,
      email: email,
      username: username,
      password: password,
      biodata: biodata,
      total_score: 0,
      city: city,
      social_media: socialMedia
    }

    return response.status(201).json({
      statusCode: 201,
      message: "Register Success!",
      data: data
    });
  } catch (error) {
    return response.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
}