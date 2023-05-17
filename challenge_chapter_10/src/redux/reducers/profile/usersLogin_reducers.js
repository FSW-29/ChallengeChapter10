const initialState={
    userUID:null,
    userName:null,
    userEmail:null,
    userPassword:null,
    userCity:null,
    userBiodata:null,
    userSocialMedia:null,
    userTotalScore:null
}

export default function usersLogin(state=initialState, action){
    switch(action.type){
        case 'LOGIN_AUTHENTICATED':
            return{...state, 
                userUID: action.payload.id,
                userName: action.payload.username,
                userEmail: action.payload.email,
                userPassword: action.payload.password,
                userCity: action.payload.city,
                userBiodata: action.payload.biodata,
                userSocialMedia: action.payload.social_media,
                userTotalScore: action.payload.total_score
            }

        case 'LOGOUT':
            return initialState;
        
        default:
            return state;

        
    }
}