import { defineStore } from "pinia";
import gameService from "../services/game.service"
import SocketioService from "../services/socketio.service";

function timeOfStart(){
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  return hour+":"+min
}


export const useGameStore = defineStore("game", {
  state: () => ({
    gameData: {
      gameName: "let us go",
    },
    selectedGame: '0',
    aSimpleTest: "test",
  }),
  actions: {
    launchGameAction(room: string, user_id: string,user_name:string) {
      console.log(timeOfStart())
      SocketioService.leaveRoom( {room:'active-users', user_id} );
      SocketioService.joinRoom( {room, user_name, user_id} );
      return gameService.launchGameService(room)
    },
    setGameFromURL(room_id: string) {
      this.selectedGame = room_id;
    }
  },
  getters: {
    getGameData: state => state.gameData,
    getCurrentlySetGame: state => state.selectedGame,
  }
})