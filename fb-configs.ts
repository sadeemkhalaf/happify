import auth from "@react-native-firebase/auth";
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAwglQvfdxSUw4r3y5EnN1RG8Xy6M3XXKQ",
  authDomain: "happify-57eaa.firebaseapp.com",
  projectId: "happify-57eaa",
  storageBucket: "happify-57eaa.appspot.com",
  messagingSenderId: "968909355038",
  appId: "1:968909355038:web:02c74db32f9a7bea38960f",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


// General Collections
const usersCollection = firestore().collection('Users');

export { firebase, auth, firestore, usersCollection };