import { defineStore } from "pinia";
import AuthService from "../services/auth.service"
import RoomService from "../services/room.service.js";

interface User {
  email: string;
  password: string;
  user_name?: string;
  account_id?: string;
}

interface UserType {
  id: string;
  token: string;
  user_name: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: import.meta.env.VITE_TOKEN,
    socketEndpoint: import.meta.env.VITE_SOCKET_ENDPOINT,
    loggedIn: false,
    user: {
      id: "0",
      user_name: "Default",
      token: ""
    },
    profileInfo: {
      avatar: "",
      email: "",
      Id: 0,
      memberSince: "",
    },
  }),

  actions: {
    setUser(cookieData: any) {
      this.user = JSON.parse(cookieData).data;
      this.token = this.user.token;
    },
    login(user: User) {
      return AuthService.login(user).then(
        (userRes: UserType) => {
          this.user = userRes;
          this.loggedIn = true;
          localStorage.setItem("user", JSON.stringify({ data: this.user }));
          return Promise.resolve(userRes);
        },
        (error: Error) => {
          this.loggedIn = false;
          this.user = {
            id: "",
            token: "",
            user_name: ""
          };
          return Promise.reject(error);
        }
      )
    },
    register(user: User) {
      return AuthService.register(user).then(
        (userRes: UserType) => {
          this.user = userRes;
          this.loggedIn = true;
          localStorage.setItem("user", JSON.stringify({ data: this.user }));
          return Promise.resolve(userRes);
        },
        (error: Error) => {
          this.loggedIn = false;
          this.user = {
            id: "",
            token: "",
            user_name: ""
          };
          return Promise.reject(error);
        })
    },
    signout: (userId: any)=>{
      RoomService.deleteRoom(userId)
    },

  },
  getters: {
    getUserInfo: state => state.user,
    getToken: state => state.user.token,
    getEndPoint: state => state.socketEndpoint,
    getProfileInfo: state => state.profileInfo,
  }
})