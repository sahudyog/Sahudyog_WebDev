import React, { useState } from 'react';
import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyC3tQVLSsyuasQMhbqM6_TWrftE_dbn_7c'; // Ensure this key is correct and secure
const TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

const Translation = () => {
  const [place, setPlace] = useState('');
  const [translations, setTranslations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For showing loading state

  // Mapping places to their local languages
  const placeLanguageMap = {
    'karnataka': 'kn', // Kannada
    'maharashtra': 'mr', // Marathi
    'tamil nadu': 'ta', // Tamil
    'kerala': 'ml', // Malayalam
    'andhra pradesh': 'te', // Telugu
    'west bengal': 'bn', // Bengali
    'punjab': 'pa' // Punjabi
  };

  const phrases = ["Hello", "How are you?", "Thank you", "Good Morning", "Good Night"];

  // Translate a single text to the target language
  const translateText = async (text, targetLang) => {
    try {
      console.log(`Translating "${text}" to ${targetLang}`); // Debugging the translation
      const response = await axios.post(TRANSLATE_API_URL, null, {
        params: {
          q: text,
          target: targetLang,
          key: GOOGLE_API_KEY
        }
      });

      // Log the response to debug the API output
      console.log('Translation API Response:', response);

      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      setErrorMessage('An error occurred during translation. Please try again.');
      return text; // Fallback to original text if translation fails
    }
  };

  // Handle translation for the input place
  const handleTranslate = async () => {
    // Normalize the place to lowercase for matching
    const normalizedPlace = place.toLowerCase();

    // Check if place exists in the map
    const targetLang = placeLanguageMap[normalizedPlace];

    if (!targetLang) {
      setErrorMessage('Invalid place entered. Please try again.');
      setTranslations([]);
      return;
    }

    // Reset error message and translations before starting
    setErrorMessage('');
    setIsLoading(true); // Start loading indicator

    try {
      // Translate all phrases
      const translatedPhrases = await Promise.all(
        phrases.map((phrase) => translateText(phrase, targetLang))
      );

      console.log('Translated Phrases:', translatedPhrases); // Debugging the result

      setTranslations(translatedPhrases);
    } catch (error) {
      console.error("Error during translation:", error);
      console.error('Full Error:', error.response ? error.response.data : error.message);   
      setErrorMessage('Error during translation process.');
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <div>
      <h2>Language Translator</h2>
      <input
        type="text"
        placeholder="Enter a place (e.g., Karnataka)"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <button onClick={handleTranslate} disabled={isLoading}>
        {isLoading ? 'Translating...' : 'Translate'}
      </button>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      {translations.length > 0 && (
        <div>
          <h3>Translations:</h3>
          <ul>
            {phrases.map((phrase, index) => (
              <li key={index}>
                {phrase} → {translations[index]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Translation;
