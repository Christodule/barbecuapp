// firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase configuration details here
  apiKey: "AIzaSyCaFpenvn8BRicPVnvJVDaj0IwUKcCmsfA",
  authDomain: "barbecuapp-388121.firebaseapp.com",
  databaseURL: "https://barbecuapp-388121-default-rtdb.firebaseio.com",
  projectId: "barbecuapp-388121",
  storageBucket: "barbecuapp-388121.appspot.com",
  messagingSenderId: "725599889208",
  appId: "1:725599889208:web:f164d8e7e39b3da92f83cd"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();



