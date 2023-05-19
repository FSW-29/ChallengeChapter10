import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/redux/actions/users";
import { useRouter } from "next/router";
import Head from "next/head";
<<<<<<< HEAD
import firebase from "@/services/firebase";
import { ref, get, child, getDatabase, update } from "firebase/database";
import {getStorage, ref as refStorage, uploadBytesResumable} from "firebase/storage";
=======
>>>>>>> 8daa4bc63071f4de1e0c1dd8b2eeea87acc585c4
import NavbarMainComponent from "@/components/NavbarMainComponent";


export default () => {

    const userProfile=useSelector(state => state.usersLogin)
    const dispatch=useDispatch();
    // > router
    const router = useRouter();

    const database = getDatabase(firebase);
    
    let [userUsername, setUserUsername] = useState();
    let [userCity, setUserCity] = useState();
    let [userBiodata, setUserBiodata] = useState();
    let [userSocialMedia, setUserSocialMedia] = useState();


    let [fileUser, setFileUser]=useState();
    let [imageUser, setImageUser]=useState();


    useEffect(() =>{
        cekToken();
        fetchData();
    },[])

    const cekToken = () =>{
        if (!localStorage.getItem("token")) {
            router.push("/login");
          }
    }
    
    let userNum=null;
    const fetchData = async () =>{
        try{
            const data=await fetch('/api/profile/users')
            let cekData=await data.json()
            console.log(data,"===> data di profile.jsx")
            console.log(cekData,"===> cekData di profile.jsx")

            let tokenCurrentUser = localStorage.getItem("token");

            console.log(tokenCurrentUser, "==> ini token yang sedang login");

            for (let i = 0; i < cekData.length; i++) {
                if (cekData[i].id === tokenCurrentUser) {
                  userNum = i;
                  console.log(userNum, "===> data user berada di array posisi ini");
                }
              }
            if (!userNum) {
                alert("token invalid, you access our page illegaly");
                localStorage.removeItem("token");
                router.push("/login");
              }
              console.log(cekData[Number(userNum)],"=> data user yang sedang login")
            
            let setProfile=userLogin(cekData[Number(userNum)]);
            dispatch(setProfile);
        }catch(err){
            console.log(err)
        }
    }
    //lanjutkan edit profile, tampilkan, dsb


    const handleEdit = async (event) =>{
        event.preventDefault()
        try{
            const data=await fetch('/api/profile/users')
                let cekData=await data.json()
                console.log(data,"===> data di profile.jsx")
                console.log(cekData,"===> cekData di profile.jsx")

                let tokenCurrentUser = localStorage.getItem("token");


                console.log(tokenCurrentUser, "==> ini token yang sedang login");

                //looping untuk pencarian data user yang sesuai dengan uid
                for (let i = 0; i < cekData.length; i++) {
                //kondisinal untuk mengambil index array yang sesuai dengan uid
                    if (cekData[i].id === tokenCurrentUser) {
                        userNum = i;
                        console.log(userNum, "===> data user berada di array posisi ini");
                    }
                }
                //ambil data /users menjadi kumpulan object of object
                const databaseFirebase = await get(child(ref(database), "users"));
                let collectionObject = databaseFirebase.val();
                //penampung untuk mengecek looping ke berapa
                let temp = 0;
                //penampung index /users/tempProperty dari firebase
                let tempProperty;

                console.log(userNum, "=>");
                //looping obbject in object
                for (let property in collectionObject) {
                    //kondisional buat pengecek apakah looping sudah sesuai dengan index array
                    if (temp === userNum) {
                    // console.log(`${property}: ${collectionObject[property]}`)
                        console.log("kena if");
                        tempProperty = property;
                    }
                    temp++;
                }
                console.log(tempProperty, "==> INI ISI TEMP PROPERTY dari tombol edit");
                //ambil data dari input user
                let tempCity, tempBiodata, tempSocialMedia, tempUsername;
                if (!userUsername) {
                    tempUsername = cekData[Number(userNum)].username;
                } else {
                    tempUsername = userUsername;
                }
                if (!userCity) {
                    tempCity = cekData[Number(userNum)].city;
                } else {
                    tempCity = userCity;
                }
                if (!userBiodata) {
                    tempBiodata = cekData[Number(userNum)].biodata;
                } else {
                    tempBiodata = userBiodata;
                }
                if (!userSocialMedia) {
                    tempSocialMedia = cekData[Number(userNum)].social_media;
                } else {
                    tempSocialMedia = userSocialMedia;
                }
                const inputUser = {
                    email: cekData[Number(userNum)].email,
                    username: tempUsername,
                    id: cekData[Number(userNum)].id,
                    password: cekData[Number(userNum)].password,
                    total_score: cekData[Number(userNum)].total_score,
                    city: tempCity,
                    biodata: tempBiodata,
                    social_media: tempSocialMedia,
                };

                console.log(inputUser, "===> ini isi input user");
                const updates = {};
                updates["/users/" + tempProperty] = inputUser;
                update(ref(database), updates);
                alert("Profile Successfully Updated!");
                router.push('/home')
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdatePicture = async (e) =>{
        e.preventDefault();

        let fileName=fileUser.name
        const storage= getStorage(firebase)

        let tokenCurrentUser = localStorage.getItem("token");


        const storageRef=refStorage(storage, `profile/${tokenCurrentUser}`)

        const uploadImage = uploadBytesResumable(storageRef, fileUser)
        console.log(storageRef, "==> this is final storageref")
        console.log(uploadImage, "===> ini yg diupload")
        router.push('/home')
    }

    const handleFile = (e) =>{
        e.preventDefault()
        let fileInputUser=e.target.files[0]
        setFileUser(fileInputUser)
        let fileReader=new FileReader();

        fileReader.addEventListener('load', () =>{
            console.log(fileReader.result, "===> this is image")
            setImageUser(fileReader.result)
        })

        if (fileInputUser.type.includes("image/")){
            console.log("===> ini lulus include");
            fileReader.readAsDataURL(fileInputUser)
        }
    }



    return(
        <>
            <Head>
                <title>Profile</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
<<<<<<< HEAD

            <NavbarMainComponent />

=======
            <NavbarMainComponent />
>>>>>>> 8daa4bc63071f4de1e0c1dd8b2eeea87acc585c4
            {
                userProfile ? (
                    <>
                        <div className="container border rounded border-info mt-3">
                        <h1>Profile Page</h1>
                            <form onSubmit={handleUpdatePicture}>
                                <div className="mb-3">
                                    <label className='form-label'>Change Profile Picture</label>
                                    <input 
                                        type='file' className='form-control' 
                                        onChange={e => handleFile(e)}
                                    />
                                    
                                    {
                                        imageUser && (
                                            <>
                                                <p>New Profile Picture preview</p>
                                                <img src={imageUser} alt='img-user' height='150' width='150' />
                                            </>
                                        )
                                    }
                                </div>
                            <button type="submit" className="btn btn-primary">Upload</button>
                            </form>
                            {userProfile.total_score > 9 && (
                                <img src="assets/badge/silver.png" height={50} width={50}></img>
                            )}
                            {userProfile.total_score > 99 && (
                                <img src="assets/badge/gold.png" height={50} width={50}></img>
                            )}
                            {userProfile.total_score > 999 && (
                                <img src="assets/badge/platinum.png" height={50} width={50}></img>
                            )}
                        
                        <form onSubmit={handleEdit}>
                            <div className="mb-3 rounded border">
                                <label className="form-label">
                                    <b>Username</b>
                                </label>
                                 <p className="text-muted">{userProfile.username}</p>
                                <label className="blockquote-footer">
                                    <strong>Edit Username</strong>
                                </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setUserUsername(e.target.value)}
                                    />
                            </div>
                            <div className="mb-3 rounded border">
                                <label className="form-label">
                                    <b>Email</b>
                                </label>
                                 <p className="text-muted">{userProfile.email}</p>
                            </div>
                            <div className="mb-3 rounded border">
                                <label className="form-label">
                                    <b>City</b>
                                </label>
                                 <p className="text-muted">{userProfile.city}</p>
                                <label className="blockquote-footer">
                                    <strong>Edit City</strong>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setUserCity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 rounded border">
                                <label className="form-label">
                                    <b>Biodata</b>
                                </label>
                                 <p className="text-muted">{userProfile.biodata}</p>
                                <label className="blockquote-footer">
                                    <strong>Edit Biodata</strong>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setUserBiodata(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 rounded border">
                                <label className="form-label">
                                    <b>Social Media</b>
                                </label>
                                    <a href={userProfile.social_media} className="link-primary">
                                        <br />
                                            Go to User Social Media
                                        <br />
                                    </a>
                                
                                <label className="blockquote-footer">
                                    <strong>Edit Social media</strong>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setUserSocialMedia(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 rounded border">
                                <label className="form-label">
                                    <b>Total Score</b>
                                </label>
                                <p className="text-muted">{userProfile.total_score}</p>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Edit Profile
                            </button>
                        </form>
                        </div>
                    </>
                ) : (
                    <h1>Loading....</h1>
                )
            }


        
        </>
    )
}