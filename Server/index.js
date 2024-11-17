const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const credentials = require('./config/serviceAccountKey.json');
const path = require('path');

// Initialize Firebase Admin SDK
initializeApp({
    credential: cert(credentials),
    storageBucket: 'gs://anmol-shops.appspot.com',
});
const db = getFirestore();

const app = require('./app');

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
    console.log(`Visit: http://localhost:${port}`);
});
