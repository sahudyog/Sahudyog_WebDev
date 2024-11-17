import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const TripPlanner = ({ initialSource, initialDestinations, initialStartDate, initialEndDate }) => {
  const [source, setSource] = useState(initialSource || ""); // State for source
  const [destinations, setDestinations] = useState(initialDestinations || []); // State for destinations
  const [startDate, setStartDate] = useState(initialStartDate || ""); // State for start date
  const [endDate, setEndDate] = useState(initialEndDate || ""); // State for end date
  const [tripPlan, setTripPlan] = useState(null); // State for trip plan
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for errors
  const apiKey = "AIzaSyDUqHVsfyGn6eY36hnP2xjoi9BUbI_WKHQ"; // API key

  const generateTripPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      // Initialize the Google Generative AI client
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Define the prompt
      const prompt = `
        Generate a trip plan starting from ${source}.
        The trip includes visiting the following destinations: ${destinations.join(", ")}.
        The trip starts on ${startDate} and ends on ${endDate}.
        Provide a detailed itinerary, including activities, places to visit, and time allocations for each destination.
        Give output in JSON format in key-value pairs in a single string.
      `;

      // Generate content from the model
      const result = await model.generateContent(prompt);

      // Check if the response has the expected content
      const generatedText = result.response.candidates[0].content.parts[0];
      console.log("Generated Text:", generatedText);

      // Remove any extra formatting (like ```json)
      const cleanedText = generatedText.replace(/^```json\s*|\s*```$/g, "").trim();

      // Check if the cleaned text is a valid JSON string
      if (typeof cleanedText === "string") {
        try {
          // Parse the JSON content
          const tripPlanJson = JSON.parse(cleanedText);
          setTripPlan(tripPlanJson);
        } catch (err) {
          setError("Failed to parse the trip plan response. Please try again.");
          console.error("Error parsing trip plan JSON:", err);
        }
      } else {
        setError("The response is not in the expected format. Please try again.");
      }
    } catch (err) {
      setError("Failed to generate trip plan. Please try again.");
      console.error("Error generating trip plan:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Trip Planner</h1>
      <div>
        <label>
          Source:
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          Destinations (comma-separated):
          <input
            type="text"
            value={destinations.join(", ")}
            onChange={(e) =>
              setDestinations(e.target.value.split(",").map((s) => s.trim()))
            }
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <button onClick={generateTripPlan} disabled={loading}>
          {loading ? "Generating..." : "Generate Trip Plan"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {tripPlan && (
        <div>
          <h2>Generated Trip Plan</h2>
          <pre>{JSON.stringify(tripPlan, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;
