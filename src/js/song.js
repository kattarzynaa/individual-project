import {select, templates} from './settings.js';
import utils from './utils.js';

class Song{
  constructor(id, filename, ranking, categories, title, name){
    const thisSong = this;


    thisSong.id = id;
    thisSong.filename = filename;
    thisSong.ranking = ranking;
    thisSong.categories = categories;
    thisSong.title = title;
    thisSong.name = name;
  
    thisSong.renderInList();

  }

  renderInList(){
    const thisSong = this;

    const generatedHTML = templates.songsList(thisSong);

    //const compiledSongs = Handlebars.compile(generatedHTML);
    //console.log(compiledSongs(thisSong.filename));

    thisSong.element = utils.createDOMFromHTML(generatedHTML);
    const songContainer = document.querySelector(select.containerOf.songList);
    songContainer.appendChild(thisSong.element);
   
  }
}

export default Song;