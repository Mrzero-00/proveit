const SET_USERINFO = 'userState/SET_USERINFO';

export const setUserInfo = (value)=>({type:SET_USERINFO,value});

const initState ={
    department:"",
    email: "",
    hash: "",
    mailing: "N",
    memo: null,
    nick: null,
    position: null,
    thumbnail: null,
    u_id:"",
    user_name: "",
    youtube: null,
}


export default function userState(state=initState, action){
    switch(action.type){
        case SET_USERINFO:
            return {
                state:action.value
            }
        default:
            return{
            state
        }
    }
}