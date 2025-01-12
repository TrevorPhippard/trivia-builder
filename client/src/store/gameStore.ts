import { defineStore } from "pinia";
import gameService from "../services/game.service"

export const useGameStore = defineStore("game", {
  state: () => ({
    gameData: {
      gameName: "let us go",
    },
    selectedGame: '0',
    aSimpleTest: "test",
    gameUsers: []
  }),
  actions: {
    launchGame(room: string) {
      return gameService.launchGame(room);

    },
    setGameFromURL(room_id: string) {
      this.selectedGame = room_id;
    }
  },
  getters: {
    getGameData: state => state.gameData,
    getCurrentlySetGame: state => state.selectedGame,
    getGameUserList: state => state.gameUsers,
  }
})