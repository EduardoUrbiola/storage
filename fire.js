import firebase from 'firebase';
var firebaseConfig = {
  apiKey: 'AIzaSyCCMhCjomggBJK6OgG2nh963d9YsxbtBlg',
  authDomain: 'keeperloginuser.firebaseapp.com',
  projectId: 'keeperloginuser',
  storageBucket: 'keeperloginuser.appspot.com',
  messagingSenderId: '141037635808',
  appId: '1:141037635808:web:085cf6621fb5bc48e0e885',
  measurementId: 'G-K0LV8EKPHD',
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore;
const auth = app.auth();

export { db, auth };
