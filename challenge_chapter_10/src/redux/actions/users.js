
export function userLogin(users){
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