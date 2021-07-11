import firebase from 'firebase';
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyB5NRMv53sh4H_Qb7u8cXf92axX8YOeCAk",
    authDomain: "story-hub-b94b4.firebaseapp.com",
    databaseURL: "https://story-hub-b94b4.firebaseio.com",
    projectId: "story-hub-b94b4",
    storageBucket: "story-hub-b94b4.appspot.com",
    messagingSenderId: "99123506155",
    appId: "1:99123506155:web:5a0e0f4428604a3137c7ae"
  };

  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();