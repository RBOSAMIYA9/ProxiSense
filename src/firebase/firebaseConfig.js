import firebase from 'firebase'
import 'firebase/storage';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyCLFHRMO1u-6UREh6q3FbzXBLpxFUUojGU",
    authDomain: "todo-list-a6588.firebaseapp.com",
    projectId: "todo-list-a6588",
    storageBucket: "todo-list-a6588.appspot.com",
    messagingSenderId: "1044997501729",
    appId: "1:1044997501729:web:c6a8edae1baaf822220460"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { projectFirestore, timeStamp, auth, provider };