// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyBhip_80PUW3O4sT4ZTXtYar86PAHYnhCk",
      authDomain: "car-service-9d1d9.firebaseapp.com",
      projectId: "car-service-9d1d9",
      storageBucket: "car-service-9d1d9.appspot.com",
      messagingSenderId: "363329206872",
      appId: "1:363329206872:web:af79e2bfb02da54bbf682d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;