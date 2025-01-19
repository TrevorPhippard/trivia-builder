
import { defineStore } from "pinia";

import UploadService from "../services/upload.service";
import EditorService from "../services/editor.service"



const blankSlides = {
  name: "slide 1",
  type: "checkbox",
  question: "",
  options: [
    { choice: "", correct: false },
  ],
  bgImg: import.meta.env.VITE_BASE_ENDPOINT + "images/img-0906.jpg"
};

export const useEditorStore = defineStore("editor", {
  state: () => ({
    gameId:"",
    gameName: "",
    showSlide: 0,
    slides: [blankSlides],
    gameAr:[] as any[],
    modal: false,
  }),

  actions: {

    blankSlideInfo() {
      return {
        name: "slide " + (Number(this.slides.length) + 1),
        type: "",
        question: "",
        options: [],
        bgImg: import.meta.env.VITE_BASE_ENDPOINT + "images/img-0906.jpg"
      }
    },

    updateGameName(name: string) {
      this.gameName = name
    },

    saveGameToDatabase(){
      const sendData = {
        gameName:this.gameName,
        user_name:"editor",
        slides:JSON.stringify(this.slides),
      }

      if(this.gameId){
        EditorService.updateTrivia(sendData, this.gameId)
        .then((data) =>{
          this.gameAr = data;
      })
      }else{
        EditorService.postTrivia(sendData)
        .then((data) =>{
          this.gameAr = data;
        })
      }
    },

    deleteGameFromDatabase(index:string){
      if(index){
        EditorService.deleteTrivia(index)
        .then((data: any) => {
          this.gameAr =data.entries;
        })
      }
    },

    fetchGameFromDatabase(){
      EditorService.fetchTrivia().then(data=>{

        console.log('fetchGameFromDatabase::',data)

        if(data.length){
          this.gameAr = data;
        }
      });
    },

    fetchGameById(index:string){
      this.gameId =index
      EditorService.fetchTriviaById(index).then((item)=>{
        if(item.id){
          this.gameId =item.id
          this.gameName =item.gameName
          this.slides =  item.slides ? JSON.parse(item.slides) : item.slides
        }else{
          console.error("Game not found")
        }
      });
    },
    createNewGame(){
          this.gameId = "";
          this.gameName= "";
          this.slides =  [blankSlides]
    },

    /** edit slides actions */
    onSlideAdd() {
      this.slides.push(this.blankSlideInfo())
    },
    onSlideAction(id: number) {
      this.showSlide = id;
    },
    onSlideMove(id: number, id2: number) {
      console.log(id, id2)
    },
    onSlideRemove() {
      this.slides.splice(this.showSlide, 1);
    },
    onSlideEdit(index: number, text: string) {
      this.slides[index].name = text;
    },
    updateSlideQuestion(text: string) {
      this.slides[this.showSlide].question = text;
    },
    updateSlideBg(res: string) {
      const tempUrl = import.meta.env.VITE_BASE_ENDPOINT + "uploads/"
      this.slides[this.showSlide].bgImg =tempUrl+ JSON.parse(res).filename;
    },

    upload(formData: any) {
      // for (const pair of formData.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]);
      // }

      UploadService.upload(formData,  (responseData: string) =>{
        return this.updateSlideBg(responseData);
      });
    },

    /** edit checkbox actions */
    addChoice() {
      this.slides[this.showSlide].options.push({
        choice: "",
        correct: false
      })
    },
    removeChoice(index: number) {
      this.slides[this.showSlide].options.splice(index, 1);
    },
    updateChoice(event: Event) {
      const target = event.target as HTMLInputElement;
      const index = (target.id.split("opt_"))[1];
      this.slides[this.showSlide].options[Number(index)].choice = target.value;
    },
    updateCheck(event: Event) {
      const target = event.target as HTMLInputElement;
      const index = (target.id.split("check_"))[1];
      this.slides[this.showSlide].options[Number(index)].correct = target.checked;
    },
    toggleModal(mode: boolean) {
      this.modal = mode;
    },

  },
  getters: {
    editorName: state => state.gameName,
    editorSlides: state => state.slides,
    editorCurrentSlides: state => state.slides[state.showSlide],
    getGameList: state => state.gameAr,

  }
})