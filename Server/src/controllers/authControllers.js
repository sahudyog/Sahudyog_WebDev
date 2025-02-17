const { firebaseApp } = require('../../firebaseConfig');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } = require('firebase/auth');
const nodemailer = require('nodemailer');

const db = admin.firestore();
const auth = getAuth(firebaseApp);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sahudyog20@gmail.com',
        pass: 'bocn hqxi pszy sume',
    },
});

exports.userSignup = async (req, res, next) => {
    const { phoneNumber, email, password, fullName, gender } = req.body;

    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save additional user information in Firestore
        await db.collection('users').doc(user.uid).set({
            name: fullName,
            phone: phoneNumber,
            gender: gender,
            email: email,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        const mailOptions = {
            from: 'sahudyog20@gmail.com',
            to: email,
            subject: 'Welcome to Our Website!',
            text: `Hello ${fullName},\n\nWelcome to our website! We are glad to have you on board.\n\nBest regards,\nAnmol Shops`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({
            status: 'success',
            data: {
                user: user,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.userSignin = async (req, res, next) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
        const user = userCredential.user;

        // Get Firebase ID token
        const idToken = await user.getIdToken(/* forceRefresh */ true);

        const decodedToken = jwt.decode(idToken, { complete: true });

        res.status(200).json({
            status: 'success',
            data: {
                user: user,
                token: idToken,
                decodedToken: decodedToken,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.userData = async (req, res, next) => {
    const userId = req.user.uid; // Assuming `req.user` is set by middleware after token verification
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userData = userDoc.data();
        res.status(200).json({ user: userData, userId: userId });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error });
    }
};
