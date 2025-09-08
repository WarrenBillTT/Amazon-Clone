import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  authDomain: "challenge-ebb48.firebaseapp.com",
  projectId: "challenge-ebb48",
  storageBucket: "challenge-ebb48.appspot.com",
  messagingSenderId: "251858540704",
  appId: "1:251858540704:web:d0e5b2139b103d9bcd11c5",
  measurementId: "G-3RNZK6C3B6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
