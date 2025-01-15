// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Firebase 프로젝트 설정
const firebaseConfig = {
    apiKey: "AIzaSyCLfKoeopiliMsWbCQ2ovPDw0Z5BYXWI3Y",
    authDomain: "hanjaquiz-c8329.firebaseapp.com",
    projectId: "hanjaquiz-c8329",
    storageBucket: "hanjaquiz-c8329.firebasestorage.app",
    messagingSenderId: "437615802417",
    appId: "1:437615802417:web:b3fccfedd4295b17a23d10",
    measurementId: "G-C06D43NDK5"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase Analytics 초기화
const analytics = getAnalytics(app);

export { analytics, logEvent };