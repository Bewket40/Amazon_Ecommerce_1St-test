// Import Firebase modules

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
// import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// Firebase project config

const firebaseConfig = {
apiKey: "AIzaSyA-z7gE8oQqCoLypmgvwdZWhjWyQwTREtA",
authDomain: "clone-project-34117.firebaseapp.com",
projectId: "clone-project-34117",
storageBucket: "clone-project-34117.firebasestorage.app",
messagingSenderId: "438682702150",
appId: "1:438682702150:web:ae8baf5e7e6dcff7081547"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig)

// Export Auth module

export const auth = getAuth(app)

// export const db= app.firestore()
