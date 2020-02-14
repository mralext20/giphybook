import GiphyController from "./Controllers/GiphyController.js";

class App {
  constructor() {

    this.giphy = new GiphyController();
  }
}

window["app"] = new App();
