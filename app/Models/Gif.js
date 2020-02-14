export default class Gif {
    constructor(data) {
        this.fromgiphy = data._id ? false : true;
        this.id = data._id || data.id
        this.title = data.title
        this.url = data.images ? data.images.original.url : data.url
    }

    get Template() {
        return /**html */`
<div class="col-12 col-lg-6">
<div class="card">
<img class="card-img-top" src="${this.url}" alt="">
<div class="card-body">
<h5 class="card-title">${this.title}</h5>

<button class="btn btn-${this.fromgiphy ? 'success' : 'danger'}" onclick="app.giphy.${this.fromgiphy ? 'save' : 'delete'}('${this.id}')">
${this.fromgiphy ? 'save' : 'delete'}</button>
</div>
</div>
</div>

        `
    }
}