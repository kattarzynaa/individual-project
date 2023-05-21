export const select = {
  templateOf: {
    audio: '#audio-player-template',
    search: '#search-song-template',
    discover: '#discover-song-template',
  },
  containerOf: {
    songList: '#song-list',
    searchSongList: '#search-song-list',
    discoverSongList: '#discover-song-list',
    pages: '#pages',
    searchBtn: '#button-search',
    tryBtn: '#button-discover',
  },
  nav: {
    links: '.main-nav a',
  },
  button: {
    joinButton: '#button-join',
  }
};

export const settings = {
  db: {
    //songsUrl: '//localhost:3131',
    songsUrl: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    songs: 'songs',
    authors: 'authors',
  }
};

export const templates = {
  songsList: Handlebars.compile(document.querySelector(select.templateOf.audio).innerHTML),
  findSong: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  discoverSong: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
};