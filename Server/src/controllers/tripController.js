const admin = require('firebase-admin');
const db = admin.firestore();
const { getStorage } = require('firebase-admin/storage');


exports.createTrip = async (req, res) => {
    const { startDate, endDate, source, destinations } = req.body;
    const userId = "1hiJfBAhdyXPrXaqxdk4NPLkKr42"; // User ID from authentication middleware

    try {
        const tripData = {
            startDate,
            endDate,
            source,
            destinations, // Array of destinations
            userId, // Reference to the user
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        // Add trip to the global `trips` collection
        const tripRef = await db.collection('trips').add(tripData);

        // Add trip to the user's `trips` subcollection
        await db
            .collection('users')
            .doc(userId)
            .collection('trips')
            .doc(tripRef.id)
            .set(tripData);

        res.status(201).json({
            status: 'success',
            message: 'Trip created successfully',
            tripId: tripRef.id,
            data: tripData,
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Error creating trip',
            error: error.message,
        });
    }
};

exports.deleteTrip = async (req, res) => {
    const { tripId } = req.params; // Trip ID from URL
    const userId = req.user.uid; // User ID from authentication middleware

    try {
        // Check if the trip exists in the global `trips` collection
        const tripDoc = await db.collection('trips').doc(tripId).get();

        if (!tripDoc.exists) {
            return res.status(404).json({
                status: 'fail',
                message: 'Trip not found in global collection',
            });
        }

        const tripData = tripDoc.data();

        // Verify ownership
        if (tripData.userId !== userId) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to delete this trip',
            });
        }

        // Delete the trip from the global `trips` collection
        await db.collection('trips').doc(tripId).delete();

        // Delete the trip from the user's `trips` subcollection
        await db
            .collection('users')
            .doc(userId)
            .collection('trips')
            .doc(tripId)
            .delete();

        res.status(200).json({
            status: 'success',
            message: 'Trip deleted successfully from all locations',
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Error deleting trip',
            error: error.message,
        });
    }
};
