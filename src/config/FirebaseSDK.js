import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGE_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID
} from "@env";

// Initialize Firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

if (!firebase.apps.length) {
  // avoid re-initializing
  firebase.initializeApp(firebaseConfig);
}

export const FirebaseSDK = firebase;

export const Auth = firebase.auth();

export const Firestore = firebase.firestore();
