const { firebaseApp } = require('../../firebaseConfig');
const admin = require('firebase-admin');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const db = admin.firestore();
const nodemailer = require('nodemailer');
const auth = getAuth(firebaseApp);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sahudyog20@gmail.com',
        pass: 'bocn hqxi pszy sume'
    }
});


exports.guideSignup = async (req, res) => {
    const { name, phone, place, gender, address, email, password } = req.body;

    try {
        // Create a guide with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const guide = userCredential.user;

        // Save guide information in Firestore
        await db.collection('guides').doc(guide.uid).set({
            name,
            phone,
            gender,
            email,
            address,
            place,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        const mailOptions = {
            from: 'giridhardiyu@gmail.com',
            to: email,
            subject: 'Welcome to Our Website!',
            text: `Hello ${name},\n\nWelcome to our website! We are glad to have you on board.\n\nBest regards,\nAnmol shops`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Error sending email:', error);
            }
            console.log('Email sent:', info.response);
        });


        res.status(201).json({
            status: 'success',
            message: 'Guide signup successful',
            data: {
                guideId: guide.uid,
                email,
                name,
                phone,
                place,
                gender,
                address,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.guideSignin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Authenticate guide with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const guide = userCredential.user;

        // Check if the user exists in the 'guides' collection
        const guideDoc = await db.collection('guides').doc(guide.uid).get();

        if (!guideDoc.exists) {
            return res.status(404).json({
                status: 'fail',
                message: 'Guide not found. Please ensure you signed up as a guide.',
            });
        }

        // Retrieve the Firebase ID token
        const idToken = await guide.getIdToken(/* forceRefresh */ true);

        res.status(200).json({
            status: 'success',
            message: 'Guide signin successful',
            data: {
                guideId: guide.uid,
                token: idToken,
                guideDetails: guideDoc.data(),
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};