import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBR_k_Mgjv2PG-b2rZVUQgEw8_6IFSwbLo",
  authDomain: "adventum-625d1.firebaseapp.com",
  projectId: "adventum-625d1"
};

const firebaseApp = firebase.initializeApp(config);

export var db = firebase.firestore();
export const fireAuth = firebaseApp.auth();
