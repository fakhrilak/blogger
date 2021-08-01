import { types } from "../actions/type";
const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error:"",
    message:"",
    role:""
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case types.login_success:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          error:""
        }
      case types.register_success:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          error:""
        }
      case types.load_user_success:
        return{
          ...state,
          user: payload.data,
          isAuthenticated:true,
          loading:false
        }
      case types.load_user_fail:
        return{
          ...state,
          isAuthenticated:false,
        }
      case "LOGOUT":
          localStorage.removeItem("token");
          return{
              ...state,
              isAuthenticated: false,
              loading: true,
              user: null,
          }
    
        
      default:
        return state;
    }
  }