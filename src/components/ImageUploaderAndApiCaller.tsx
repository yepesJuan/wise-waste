'use client'
import { useState } from 'react';

export default function ImageUploaderAndApiCaller() {
  const [imageBase64, setImageBase64] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      // Convert image to base64
      reader.onloadend = () => {
        const base64String = reader.result;
        setImageBase64(base64String);  // Set base64 string to state
        setImagePreview(base64String); // Set preview for the image
      };

      reader.readAsDataURL(file);  // Read the file as Data URL
    } 
  };

  // Function to call API with the image in base64 format
  const callApiWithImage = async () => {
    const sdk = ""
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sdk}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [{"role": "system", "content": "You are an assistant who responds in JSON format."}, {"role": "user", "content": "Provide the volume of a bag in liters given its dimensions: height 45 cm, width 30 cm, depth 15 cm."}],

          max_tokens: 300,
        }),
      });

      const data = await res.json();

      const contentString = data.choices[0].message.content;


      let parsedContent;
      
      try {
        // Try to parse the content string as JSON
        parsedContent = JSON.parse(contentString.replace(/```json|```/g, '').trim());
        console.log('Parsed JSON content:', parsedContent);
      } catch (error) {
        // If parsing fails, handle the error gracefully
        console.error('Failed to parse content as JSON:', error);
        parsedContent = contentString;  // Fallback to the raw content string
      }
          
      setApiResponse(parsedContent); // Store API response
    } catch (error) {
      console.error('Error calling the API:', error);
    }
  };

  return (
    <div>
      <h2>Upload Image and Call API</h2>
      
      {/* Input to select image */}
      <input type="file" onChange={handleFileChange} accept="image/*" />

      {/* Image Preview */}
      {imagePreview && (
        <div>
          <h3>Image Preview:</h3>
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '300px' }} />
        </div>
      )}

      {/* <div>
        `${apiResponse}`
      </div> */}

      {/* Button to call API */}
      {imageBase64 && (
        <button onClick={callApiWithImage}>Upload Image to Check Volume</button>
      )}

      {/* API Response Display */}
      {apiResponse && (
        <div>
          <h3>API Response:</h3>
          <pre>{`Bag Height in cm : ${apiResponse.height_cm}` }</pre>
          <pre>{`Bag depth in cm : ${apiResponse.depth_cm}` }</pre>
          <pre>{`Bag width in cm : ${apiResponse.width_cm}` }</pre>
          <pre>{`Bag Volume in liters : ${apiResponse.volume_liters}` }</pre>
        </div>
      )}
    </div>
  );
}
