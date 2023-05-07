import {settings, select} from './settings.js';
import Song from './song.js';
import FindSong from './findSong.js';

const Page ={

  renderSongs: function(){
    const thisPage = this;
    
    //console.log('thisPage.data: ', thisPage.data.songs);


    for(let songsData in thisPage.data.songs){
      new Song(thisPage.data.songs[songsData].id, thisPage.data.songs[songsData].filename, thisPage.data.songs[songsData].ranking, thisPage.data.songs[songsData].categories, thisPage.data.songs[songsData].title);
      //eslint-disable-next-line
      new GreenAudioPlayer('.player' + thisPage.data.songs[songsData].id);
    }
  },


  initData: function(){
    const thisPage = this;

    thisPage.data = {};
    const url = settings.db.songsUrl + '/' + settings.db.songs;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisPage.data.songs = parsedResponse;
        thisPage.renderSongs();
        //thisPage.findSong(thisPage.data.songs); //wywołać po kliknięciu

      });

  },

  initPages: function(){
    const thisPage = this; 

    thisPage.pages = document.querySelector(select.containerOf.pages).children;
    thisPage.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/','');

    let pageMatch = thisPage.pages[0].id;

    for(let page of thisPage.pages){
      if(page.id == idFromHash){
        pageMatch = page.id;
        break;
      }
    }

    thisPage.activatePage(pageMatch);

    for(let link of thisPage.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this; 
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisPage.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const thisPage = this;


    for(let page of thisPage.pages){
      page.classList.toggle('active', page.id == pageId);
    }

    for(let link of thisPage.navLinks){
      link.classList.toggle('active', link.getAttribute('href') == '#' + pageId);
    }

  },

  findSong: function(songs){
    //const thisPage = this;

    let findThisSong = document.getElementById('findSong').value;  //musi przyjąć litery z inputa

    let searchSongContainer = document.getElementById('search-song-list');
    console.log(searchSongContainer);

    for(let song of songs){ // pętla po piosenkach
      const songName = song.filename.toLowerCase(); //filename do małych liter
      if(songName.includes(findThisSong)){ //sprawdź czy zawiera litery jeśli tak - wygeneruj listę
        console.log(song);
        new FindSong(song.id, song.filename, song.ranking, song.categories, song.title);
        //eslint-disable-next-line
        new GreenAudioPlayer('.player' + song.id); //czemu nie działa plugin?
      } 
    }

  },

  initAction: function(){
    const thisPage = this; 
    
    const searchButton = document.querySelector(select.containerOf.searchBtn);

    console.log(select.containerOf.searchSongList);

    searchButton.addEventListener('click', function(){
      thisPage.findSong(thisPage.data.songs);
    });

  },
  
  init: function(){
    const thisPage = this;
    thisPage.initData();
    thisPage.initPages();
    thisPage.initAction();
  },
};

Page.init();






