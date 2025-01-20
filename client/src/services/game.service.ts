import axios from "axios";
const endpoint = import.meta.env.VITE_API_ENDPOINT + "trivia";

const GameService = {
  launchGameService: ( room: string) => {
    return axios.get(endpoint + `/${room}`)
      .then(response => {
        return response.data;
      });
  },

}

export default GameService;