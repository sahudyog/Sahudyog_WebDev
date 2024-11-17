import React, { useState, useEffect } from "react";
import axios from "axios";

const YouTubeVideoSuggestions = ({ destination }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const YOUTUBE_API_KEY = "AIzaSyCDrKBn1-5js9VtnJZsL8ZljNO2aTKVH7o"; 
  const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

  useEffect(() => {
    // Check if the destination is available before making the API call
    if (destination) {
      fetchVideos(destination);
    }
  }, [destination]);

  const fetchVideos = async (place) => {
    try {
      setLoading(true);
      setError("");

      // Fetch videos related to the destination and nearby places
      const response = await axios.get(YOUTUBE_API_URL, {
        params: {
          part: "snippet",
          q: `places to see in and around ${place}`, // Search query with the destination
          maxResults: 10,
          type: "video",
          order: "viewCount", // Sort by view count
          key: YOUTUBE_API_KEY,
        },
      });

      // Log the API response to debug
      console.log("YouTube API Response:", response.data);

      // Check if the response has items
      if (response.data.items && response.data.items.length > 0) {
        setVideos(response.data.items);
      } else {
        setError("No videos found for this destination.");
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Error fetching videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>YouTube Travel Video Suggestions</h2>
      {loading && <p>Loading videos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video.id.videoId}
              style={{
                width: "300px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                overflow: "hidden",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  style={{ width: "100%", height: "auto" }}
                />
                <div style={{ padding: "10px" }}>
                  <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>
                    {video.snippet.title}
                  </h4>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    {video.snippet.channelTitle}
                  </p>
                </div>
              </a>
            </div>
          ))
        ) : (
          <p>No videos found for this destination.</p>
        )}
      </div>
    </div>
  );
};

export default YouTubeVideoSuggestions;
