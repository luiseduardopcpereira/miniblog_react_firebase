import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBlu7LQHo4pWXf6tf7R5J-lfbbzBLnNsfo",
    authDomain: "miniblogsmartlimpeza.firebaseapp.com",
    projectId: "miniblogsmartlimpeza",
    storageBucket: "miniblogsmartlimpeza.appspot.com",
    messagingSenderId: "582396096497",
    appId: "1:582396096497:web:b0db835da220bee5db9e50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };