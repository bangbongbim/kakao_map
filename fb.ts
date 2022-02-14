// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRPsxP9rOjLCAqzX0V_C50W8tKqmp2Gkk",
    authDomain: "kakaomap-1a662.firebaseapp.com",
    projectId: "kakaomap-1a662",
    storageBucket: "kakaomap-1a662.appspot.com",
    messagingSenderId: "747870658753",
    appId: "1:747870658753:web:a292123801a0ea129e3440",
    measurementId: "G-51FJ4NNG8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);