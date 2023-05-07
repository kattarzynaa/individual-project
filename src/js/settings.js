export const select = {
  templateOf: {
    audio: '#audio-player-template',
  },
  containerOf: {
    songList: '#song-list',
    pages: '#pages',
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
};