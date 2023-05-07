export const select = {
  templateOf: {
    audio: '#audio-player-template',
    search: '#search-song-template',
  },
  containerOf: {
    songList: '#song-list',
    searchSongList: '#search-song-list',
    pages: '#pages',
    searchBtn: '#button-search',
  },
  nav: {
    links: '.main-nav a',
  }
};

export const settings = {
  db: {
    songsUrl: '//localhost:3131',
    songs: 'songs',
    authors: 'authors',
  }
};

export const templates = {
  songsList: Handlebars.compile(document.querySelector(select.templateOf.audio).innerHTML),
  findSong: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
};