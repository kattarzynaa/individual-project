import {select, templates} from './settings.js';
import utils from './utils.js';

class DiscoverSong{
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

    const generatedHTML = templates.discoverSong(thisSong);
    //console.log(generatedHTML);

    //const compiledSongs = Handlebars.compile(generatedHTML);
    //console.log(compiledSongs(thisSong.filename));

    thisSong.element = utils.createDOMFromHTML(generatedHTML);
    const songDiscoverContainer = document.querySelector(select.containerOf.discoverSongList);
    songDiscoverContainer.appendChild(thisSong.element);
    
    //console.log(songDiscoverContainer);
    //console.log(thisSong.element);
   
  }
}

export default DiscoverSong;