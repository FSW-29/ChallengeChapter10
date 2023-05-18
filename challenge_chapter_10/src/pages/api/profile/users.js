import { ref, get, child, getDatabase, update } from "firebase/database";
import firebase from "@/services/firebase";

export default async function ProfileAPI(req,res){
    try{

    const database = getDatabase(firebase);
    const databaseFirebase = await get(child(ref(database), "users"));
    let cekData = Object.values(databaseFirebase.val());


    console.log(databaseFirebase, "===> ini result dari api profile")

    console.log(cekData,"ini result setelag masuk object.val" )

    res.json(cekData)

    }catch(err){
        console.log(err,"MASUK ERROR")
    }


}