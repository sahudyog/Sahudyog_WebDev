exports.userSignup = async (req, res, next) => {
    const { phoneNumber, email, password, fullName, gender, address, place } = req.body;
  
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
        address: address,
        place: place,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
  
      const mailOptions = {
        from: 'sahudyog20@gmail.com',
        to: email,
        subject: 'Welcome to Our Website!',
        text: `Hello ${fullName},\n\nWelcome to our website! We are glad to have you on board.\n\nBest regards,\nAnmol shops`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      res.status(201).json({
        status: 'success',
        data: {
          user: userCredential.user,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  };
  