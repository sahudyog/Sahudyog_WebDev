const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyAt-g5wYdLDzlM8q3uOKfQxiQLN0AJZe6U",
    authDomain: "anmol-shops.firebaseapp.com",
    projectId: "anmol-shops",
    storageBucket: "anmol-shops.appspot.com",
    messagingSenderId: "884600399821",
    appId: "1:884600399821:web:f334556e6598cb526c8684",
    measurementId: "G-QVHCJH1WDE"
  };
const firebaseApp = initializeApp(firebaseConfig);

module.exports = { firebaseApp };