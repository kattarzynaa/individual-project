import {select, templates} from './settings.js';
import utils from './utils.js';

class FindSong{
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

    const generatedHTML = templates.findSong(thisSong);
    //console.log(generatedHTML);

    //const compiledSongs = Handlebars.compile(generatedHTML);
    //console.log(compiledSongs(thisSong.filename));

    thisSong.element = utils.createDOMFromHTML(generatedHTML);
    const songSearchContainer = document.querySelector(select.containerOf.searchSongList);
    songSearchContainer.appendChild(thisSong.element);
    
   
  }
}

export default FindSong;