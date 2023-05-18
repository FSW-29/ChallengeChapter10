const initialState={
    id:null,
    username:null,
    email:null,
    password:null,
    city:null,
    biodata:null,
    social_media:null,
    total_score:null
}

export default function usersLogin(state=initialState, action){
    switch(action.type){
        case 'LOGIN_AUTHENTICATED':
            return{...state, 
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
                city: action.payload.city,
                biodata: action.payload.biodata,
                social_media: action.payload.social_media,
                total_score: action.payload.total_score
            }

        case 'LOGOUT':
            return{...state,
                id: null,
                username: null,
                email:null,
                password:null,
                city:null,
                biodata:null,
                social_media:null,
                total_score:null
        }
                
                
            // return initialState;
        
        default:
            return state;

        
    }
}