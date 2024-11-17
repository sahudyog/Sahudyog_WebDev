import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const SuggestNearbyPlaces = ({ destination }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentDestination, setCurrentDestination] = useState(null);
  const [destinationValue, setDestinationValue] = useState("");
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  const destinationRef = useRef();

  const GOOGLE_API_KEY = "AIzaSyB06cKFpv55xPdQpu_gq4w77Wt7uD9n1CA";
  const GEOCODE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

  useEffect(() => {
    if (destination) {
      setDestinationValue(destination);
      fetchCoordinatesForDestination(destination);
    }
  }, [destination]);

  // Fetch coordinates for the destination
  const fetchCoordinatesForDestination = async (destinationName) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(GEOCODE_API_URL, {
        params: {
          address: destinationName,
          key: GOOGLE_API_KEY,
        },
      });

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCurrentDestination({ lat, lng });
        fetchNearbyPlaces({ lat, lng });
      } else {
        setError("Unable to get coordinates for the destination.");
      }
    } catch (err) {
      setError("Error fetching coordinates. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch nearby places using Places API
  const fetchNearbyPlaces = (latLng) => {
    if (!latLng) return;

    setLoading(true);
    setError("");

    const { lat, lng } = latLng;

    // eslint-disable-next-line no-undef
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      location: new google.maps.LatLng(lat, lng),
      radius: 5000,
      type: "tourist_attraction",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setNearbyPlaces(results);
      } else {
        setError("Error fetching nearby places.");
      }
      setLoading(false);
    });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "100%" }}>
      <div style={{ marginBottom: "20px" }}>
        {loading && <div style={{ height: "50px", backgroundColor: "#f0f0f0", marginBottom: "10px" }}>Loading...</div>}

        {error && (
          <p style={{ color: "red", marginTop: "20px" }}>
            {error}
          </p>
        )}

        {nearbyPlaces.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
            {nearbyPlaces.map((place) => (
              <div
                key={place.place_id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "15px",
                  width: "250px",
                  textAlign: "center",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {place.name}
                </h3>
                {place.photos && place.photos[0] ? (
                  <img
                    src={place.photos[0].getUrl()}
                    alt={place.name}
                    style={{ maxHeight: "150px", objectFit: "cover", marginTop: "10px", borderRadius: "8px" }}
                  />
                ) : (
                  <p>No Image Available</p>
                )}
                <p style={{ fontSize: "14px", marginTop: "10px" }}>
                  Rating: {place.rating || "N/A"}
                </p>
                <p style={{ fontSize: "14px" }}>
                  Address: {place.vicinity || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestNearbyPlaces;
