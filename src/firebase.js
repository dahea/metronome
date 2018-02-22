import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyArGoS8QjxoRnZ82F7Dlgg-995l4Sj2ogs",
  authDomain: "metronome-playlist.firebaseapp.com",
  databaseURL: "https://metronome-playlist.firebaseio.com",
  projectId: "metronome-playlist",
  storageBucket: "metronome-playlist.appspot.com",
  messagingSenderId: "41429671439"
};

firebase.initializeApp(config);
export default firebase;