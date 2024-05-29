// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyB3dqhn228nbO5lmnsTncwj6FmE32xmSy0",
  authDomain: "olx-react-b6a1e.firebaseapp.com",
  projectId: "olx-react-b6a1e",
  storageBucket: "olx-react-b6a1e.appspot.com",
  messagingSenderId: "380631880854",
  appId: "1:380631880854:web:80610aec961753b307deb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create a Firebase object to mimic the old namespaced API
const Firebase = {
  auth: getAuth(app), 
  firestore: getFirestore(app),
  storage: getStorage(app),
};

export { Firebase };
