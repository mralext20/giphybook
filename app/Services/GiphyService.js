import store from "../store.js";
import Gif from "../Models/Gif.js";


// @ts-ignore
let _giphyapi = axios.create({
  baseURL: "//api.giphy.com/v1/gifs/"
})

// ts-ignore
let _sandboxApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/alex/gifs"
})
class GiphyService {
  getMyGifs() {
    _sandboxApi.get("").then(res => {
      let gifs = res.data.data.map(gif => new Gif(gif))
      store.commit('myGifs', gifs)
    })
  }
  save(id) {
    let target = store.State.gifs.find(e => e.id == id)
    _sandboxApi.post("", target).then(res => {
      let gif = new Gif(res.data.data)
      let newMyGifs = [...store.State.myGifs, gif]
      store.commit('myGifs', newMyGifs)
    })

  }
  delete(id) {
    let target = store.State.myGifs.find(e => e.id == id)
    _sandboxApi.delete(id).then(res => {
      let gif = new Gif(res.data.data)
      let newMyGifs = [...store.State.myGifs, gif]
      store.commit('myGifs', newMyGifs)
    })

  }

  apiSearch(query) {
    _giphyapi.get(`search?api_key=leQ7ga0y6SlqvK8393VQAm2NsUDZWaFx&q=${query}`).then(res => {
      let gifs = res.data.data.map(gif => new Gif(gif))
      store.commit("gifs", gifs)
    }
    ).catch(err => console.error(err));
  }
  apiTrending() {
    _giphyapi.get('trending?api_key=leQ7ga0y6SlqvK8393VQAm2NsUDZWaFx').then(res => {
      let gifs = res.data.data.map(gif => new Gif(gif))
      store.commit("gifs", gifs)
    }
    ).catch(err => console.error(err));
  }
}


const service = new GiphyService();
export default service;
