import { get, getDatabase, push, ref } from "firebase/database";
import firebase from "@/services/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default async function LoginAPI(request, response)  {
  try {
    const { 
      email,
      password
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
    
    // > Cek ada nggak email yang diinput user didalam database
    const isEmailExists = users.find((user) => user.email === email);
  
    if (isEmailExists) {
      // > cek config firebase 
      const auth = getAuth(firebase);

      // > Authentication process
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // > user credential user
      const user = userCredential.user;

      const token = user.uid

      return response.status(200).json({
        statusCode: 200,
        message: "Login Success!",
        data: user,
        profile: isEmailExists,
        apiKey: token
      });
    } else {
      return response.status(404).json({
        statusCode: 404,
        message: 'Check Again Your Login Form'
      });
    }
  } catch (error) {
    return response.status(400).json({
      statusCode: 400,
      message: `Terjadi Error: ${error.message}`,
    });
  }
}