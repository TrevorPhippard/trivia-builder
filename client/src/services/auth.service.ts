import axios from "axios";
const endpoint = import.meta.env.VITE_API_ENDPOINT + "auth/";

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

  register:  (user: User | null)=>{
    return axios.post(endpoint + "signup", user).then(response => {
      return response.data;
    });
  }
}

export default AuthService;