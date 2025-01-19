import axios from "axios";
const endpoint = import.meta.env.VITE_API_ENDPOINT + "auth/";
const endpointRoom = import.meta.env.VITE_API_ENDPOINT + "room/";

interface User {
  account_id?: number;
  email: string;
  password: string;
  user_name?: string;
}

const AuthService = {
  login:  (user: User | null)=>{
    return axios.post(endpoint + "signin", user)
    .then(response => {
      return response.data;
    });

  },

  signout:  (userId: any)=>{
    return axios.post(endpointRoom + "signout", userId)
    .then(response => {
      return response.data;
    });

  },

  register:  (user: User | null)=>{
    return axios.post(endpoint + "signup", user).then(response => {
      return response.data;
    });
  }
}

export default AuthService;