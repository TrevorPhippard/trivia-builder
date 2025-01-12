import axios from "axios";
const endpoint = import.meta.env.VITE_API_ENDPOINT + "trivia";


interface triviaData {
  gameName: string;
  username: string;
  slides: string;
}

const EditorService = {

  fetchTrivia:() =>{
    return axios.get(endpoint)
    .then(response =>  response.data)
    .catch(error=> error.toJSON());
  },

  fetchTriviaById:(triviaId: string) =>{
    return axios.get(endpoint + `/${triviaId}`)
    .then(response => response.data)
    .catch(error=> error.toJSON());
  },

  postTrivia:(data:triviaData) =>{
    return axios.post(endpoint,data )
    .then(response =>  response.data)
    .catch(error=> error.toJSON());

  },

  updateTrivia:(data:triviaData, index:string) =>{
    return axios.put(endpoint+"/"+index, data )
    .then(response =>  response.data)
    .catch(error=> error.toJSON());

  },

  deleteTrivia:( index:string) =>{
    return  axios.delete(endpoint+"/"+index )
    .then(response =>  response.data)
    .catch(error=> error.toJSON());
  }
}

export default EditorService;