import {settings, select, templates} from './settings.js';
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



const app ={

  renderSongs: function(){
    const thisApp = this;
    
    //console.log('thisApp.data: ', thisApp.data.songs);


    for(let songsData in thisApp.data.songs){
      new Song(thisApp.data.songs[songsData].id, thisApp.data.songs[songsData].filename, thisApp.data.songs[songsData].ranking, thisApp.data.songs[songsData].categories, thisApp.data.songs[songsData].title);
      //eslint-disable-next-line
      new GreenAudioPlayer('.player' + thisApp.data.songs[songsData].id);
    }
  },


  initData: function(){
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.songsUrl + '/' + settings.db.songs;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.songs = parsedResponse;
        thisApp.renderSongs();

      });
  },

  initPages: function(){
    const thisApp = this; 

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/','');

    let pageMatch = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatch = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatch);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this; 
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;


    for(let page of thisApp.pages){
      page.classList.toggle('active', page.id == pageId);
    }

    for(let link of thisApp.navLinks){
      link.classList.toggle('active', link.getAttribute('href') == '#' + pageId);
    }

  },
  
  init: function(){
    const thisApp = this;
    thisApp.initData();
    thisApp.initPages();
  },
};

app.init();






