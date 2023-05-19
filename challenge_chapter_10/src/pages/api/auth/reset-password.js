import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { getDatabase, update, ref, get } from "@firebase/database";
import firebase from "@/services/firebase";

export default async function ResetPassword(request, response) {
  try {
    const dataBody = request.body;
    // console.info(dataBody, '=> data dari body');

    const auth = getAuth(firebase);
    const database = getDatabase(firebase);

    const verifyPasswordReset = await verifyPasswordResetCode(auth, dataBody.code);
    await confirmPasswordReset(auth, dataBody.code, dataBody.newPassword);

    const currentUser = auth;
    // console.info(currentUser, '=> ini current user');

    // > set new password to realtime database
    // => Ambil data user
    const usersRef = ref(database, "users");
    const snapshot = await get(usersRef);

    const users = [];
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      users.push({
        ids: childSnapshot.key,
        ...childData,
      });
    });

    // > Cek apakah username dan email sudah digunakan
    const checkData = users.find((user) => user.email === verifyPasswordReset);
    console.info(checkData, '=> check data email');

    if (checkData) {
      const userRef = ref(database, `users/${checkData.ids}`);
      await update(userRef, { password: dataBody.newPassword });
      console.info("Password updated successfully");
    }

    return response.status(200).json({
      statusCode: 200,
      message: 'Data Update Success!',
      data: checkData
    });
  } catch (error) {
    return response.status(400).json({
      statusCode: 400,
      message: `Terdapat Error: ${error.message}`
    });
  }
};