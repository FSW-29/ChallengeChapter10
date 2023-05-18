
export function userLogin(users){
    console.log(users,'===> ini yang masuk action')
    return{
        type:"LOGIN_AUTHENTICATED",
        payload:users
    }
}

export function userLogout(){

    return{
        type:"LOGOUT",

    }
}