import *as firebase from "firebase";
    
var config = {
  apiKey: "AIzaSyB6bQk1TDpCH3ylmFL3HHbqMjqMapiLZpU",
  authDomain: "test-c5a03.firebaseapp.com",
  databaseURL: "https://test-c5a03.firebaseio.com",
  projectId: "test-c5a03",
  storageBucket: "test-c5a03.appspot.com",
  messagingSenderId: "919585579120"
};
firebase.initializeApp(config);

export var dbFirebase = firebase.database();
export var dbRef = firebase.database().ref()
export var firebaseAuth = firebase.auth
export var user = firebase.auth().currentUser;

export function logIn(email, pw) {
    return firebaseAuth().signInWithEmailAndPassword(email, pw)
  }
  
  export function logOut() {
    return firebaseAuth().signOut()
  }
  //////////////////////////////////////