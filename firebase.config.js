import { initializeApp } from "@firebase/app";
import { initializeAuth, getReactNativePersistence} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialise async storage for Authentication persistence

// Todo: Change to non-public secrets storage (currently sent to bundle in plaintext)
// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});