import axios from "axios";
const endpoint = import.meta.env.VITE_API_ENDPOINT + "room";


interface roomData {
  id:	number;
  socket_id: string;
  owner:	number;
  user_collection:	number;
}

const EditorService = {

  fetchRoom: () => {
    return axios.get(endpoint)
      .then(response => response.data)
      .catch(error => error.toJSON());
  },

  fetchRoomById: (roomId: string) => {
    return axios.get(endpoint + `/${roomId}`)
      .then(response => response.data)
      .catch(error => error.toJSON());
  },

  postRoom: (data: roomData) => {
    return axios.post(endpoint, data)
      .then(response => response.data)
      .catch(error => error.toJSON());
  },

  updateRoom: (data: roomData, index: number) => {
    return axios.put(endpoint + "/" + index, data)
      .then(response => response.data)
      .catch(error => error.toJSON());
  },

  deleteRoom: (index: number) => {
    return axios.delete(endpoint + "/" + index)
      .then(response => response.data)
      .catch(error => error.toJSON());
  }
}

export default EditorService;