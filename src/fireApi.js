import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBR_k_Mgjv2PG-b2rZVUQgEw8_6IFSwbLo",
  authDomain: "adventum-625d1.firebaseapp.com",
  projectId: "adventum-625d1",
  storageBucket: 'gs://adventum-625d1.appspot.com',
};

const firebaseApp = firebase.initializeApp(config);


var storage = firebase.storage();

// Create a storage reference from our storage service
export var storageRef = storage.ref();
export var db = firebase.firestore();
export const fireAuth = firebaseApp.auth();
