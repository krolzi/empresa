const firebaseConfig = {
    apiKey: "AIzaSyBwX4XgtNHNbz3DxW9vCtT6aKIuGlvvQqA",
    authDomain: "ckcollection-5972a.firebaseapp.com",
    databaseURL: "https://ckcollection-5972a-default-rtdb.firebaseio.com",
    projectId: "ckcollection-5972a",
    storageBucket: "ckcollection-5972a.appspot.com",
    messagingSenderId: "299302156371",
    appId: "1:299302156371:web:4ee69938b7ed5e97062ea6",
    measurementId: "G-JKV696S628"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

