import api from "../Services/GiphyService.js";
import store from "../store.js";

//Private
function _drawGifs() {
  let gifs = store.State.gifs;
  let template = ""
  gifs.forEach(elem => {
    template += elem.Template
  })
  document.getElementById("apiGifs").innerHTML = template
}

function _drawMyGifs() {
  let gifs = store.State.myGifs;
  let template = ""
  gifs.forEach(elem => {
    template += elem.Template
  })
  document.getElementById("myGifs").innerHTML = template
}


//Public
export default class ValuesController {
  constructor() {
    store.subscribe("gifs", _drawGifs);
    store.subscribe("myGifs", _drawMyGifs)
    this.retriveTrending()
    api.getMyGifs()
  }
  retriveTrending() {
    api.apiTrending()
  }

  /**
   * @param {Event} event
   */
  search(event) {
    event.preventDefault()
    let query = event.target.query.value
    api.apiSearch(query)

  }

  save(id) {
    api.save(id)
  }

  delete(id) {
    api.delete(id)
  }
}
