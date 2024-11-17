import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const defaultCenter = { lat: 48.8584, lng: 2.2945 }; // Default to Eiffel Tower if geolocation fails.

function Maps({ destinations }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB06cKFpv55xPdQpu_gq4w77Wt7uD9n1CA",
    libraries: ["places"],
  });

  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  // Fetch current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Geolocation failed. Defaulting to Eiffel Tower.");
        }
      );
    }
  }, []);

  // Update start, end, and waypoints whenever destinations change
  useEffect(() => {
    if (destinations.length > 1) {
      setStart(destinations[0]);
      setEnd(destinations[destinations.length - 1]);
      setWaypoints(
        destinations.slice(1, -1).map((location) => ({
          location,
          stopover: true,
        }))
      );
    }
  }, [destinations]);

  // Calculate the route when start and end points are available
  useEffect(() => {
    if (start && end) {
      calculateRoute();
    }
  }, [start, end, waypoints]);

  // Debugging: Ensure the start and end are set correctly
  useEffect(() => {
    console.log("Start:", start);
    console.log("End:", end);
    console.log("Waypoints:", waypoints);
  }, [start, end, waypoints]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function calculateRoute() {
    // Check if the Google Maps API is loaded
    if (typeof window.google === 'undefined') {
      console.error('Google Maps API is not loaded yet');
      return;
    }

    // Use window.google to access the Google Maps services
    const directionsService = new window.google.maps.DirectionsService();

    try {
      const results = await directionsService.route({
        origin: start,
        destination: end,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING, // Use window.google
      });

      setDirectionsResponse(results);

      // Calculate total distance and duration
      const routeLegs = results.routes[0].legs;
      const distance = routeLegs.reduce(
        (sum, leg) => sum + leg.distance.value,
        0
      ); // in meters
      const duration = routeLegs.reduce(
        (sum, leg) => sum + leg.duration.value,
        0
      ); // in seconds

      setTotalDistance((distance / 1000).toFixed(2)); // Convert to kilometers
      setTotalDuration((duration / 60).toFixed(2)); // Convert to minutes
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  }

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <div style={{ position: "absolute", top: 0, left: 0, height: "60%", width: "100%" }}>
        <GoogleMap
          center={currentLocation}
          zoom={10}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {destinations.map((location, index) => (
            <Marker key={index} position={location} label={`${index + 1}`} />
          ))}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>

      <div
        style={{
          padding: "16px",
          borderRadius: "8px",
          margin: "16px",
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          zIndex: "1",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>Total Distance: {totalDistance} km</div>
          <div>Total Duration: {totalDuration} mins</div>
        </div>
      </div>
    </div>
  );
}

export default Maps;
