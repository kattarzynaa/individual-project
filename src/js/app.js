import {settings, select} from './settings.js';
import Song from './song.js';
import FindSong from './findSong.js';
import DiscoverSong from './discoverSong.js';

const Page ={

  renderSongs: function(){
    const thisPage = this;
    for(let songsData in thisPage.data.songs){
      const authorName = thisPage.renderAuthor(thisPage.data.songs[songsData].author);
      new Song(thisPage.data.songs[songsData].id, thisPage.data.songs[songsData].filename, thisPage.data.songs[songsData].ranking, thisPage.data.songs[songsData].categories, thisPage.data.songs[songsData].title, authorName );
      //eslint-disable-next-line
      new GreenAudioPlayer('.player' + thisPage.data.songs[songsData].id);
    }
  },

  renderAuthor: function(authorId){
    const thisPage = this;
    for(let authorDbId in thisPage.data.authors){
      if(authorId == thisPage.data.authors[authorDbId].id){
        return thisPage.data.authors[authorDbId].name;
      }
    }
  },


  discoverSong: function(songs){
    const thisPage = this; 
    let max = 0; 
    //eslint-disable-next-line
    for(let number of songs){ // pętla po piosenkach
      max++;
    } 
    const random = Math.ceil(Math.random()*max);
    for(let song of songs){ // pętla po piosenkach
      if(song.id == random){
        const authorName = thisPage.renderAuthor(song.author);
        new DiscoverSong(song.id, song.filename, song.ranking, song.categories, song.title, authorName);
        //eslint-disable-next-line
        new GreenAudioPlayer('.discover-player' + song.id);
      }
    } 
  },


  initData: function(){
    const thisPage = this;

    thisPage.data = {};
    const url = settings.db.songsUrl + '/' + settings.db.songs;
    const urlAuthors = settings.db.songsUrl + '/' + settings.db.authors;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisPage.data.songs = parsedResponse;
      });

    fetch(urlAuthors)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisPage.data.authors = parsedResponse;
        thisPage.renderSongs();
        thisPage.discoverSong(thisPage.data.songs);
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
    const thisPage = this;

    let findThisSong = document.getElementById('findSong').value;  //musi przyjąć litery z inputa

    let searchSongContainer = document.getElementById('search-song-list');
    console.log(searchSongContainer);

    for(let song of songs){ // pętla po piosenkach
      const songName = song.filename.toLowerCase(); //filename do małych liter
      if(songName.includes(findThisSong)){ //sprawdź czy zawiera litery jeśli tak - wygeneruj listę
        const authorName = thisPage.renderAuthor(song.author);
        new FindSong(song.id, song.filename, song.ranking, song.categories, song.title, authorName);
        //eslint-disable-next-line
        new GreenAudioPlayer('.search-player' + song.id);
      } 
    }

  },

  initAction: function(){
    const thisPage = this; 
    
    const searchButton = document.querySelector(select.containerOf.searchBtn);
    const tryButton = document.querySelector(select.containerOf.tryBtn);
    const joinButton = document.querySelector(select.button.joinButton);

    //console.log(select.containerOf.searchSongList);

    searchButton.addEventListener('click', function(){

      const songSearchContainer = document.querySelector(select.containerOf.searchSongList);

      while(songSearchContainer.hasChildNodes()){
        songSearchContainer.removeChild(songSearchContainer.firstChild);
      }

      thisPage.findSong(thisPage.data.songs);
    });

    tryButton.addEventListener('click', function(){

      const songDiscoverContainer = document.querySelector(select.containerOf.discoverSongList);

      while(songDiscoverContainer.hasChildNodes()){
        songDiscoverContainer.removeChild(songDiscoverContainer.firstChild);
      }

      thisPage.discoverSong(thisPage.data.songs);
    });

    joinButton.addEventListener('click', function(){
      open();
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






