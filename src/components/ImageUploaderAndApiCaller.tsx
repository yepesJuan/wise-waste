"use client";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ImageUploaderAndApiCaller({ updateTableRow }: any) {
  const [imageBase64, setImageBase64] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  interface ApiResponse {
    height_cm: number;
    depth_cm: number;
    width_cm: number;
    volume_liters: number;
  }

  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Convert image to base64
      reader.onloadend = () => {
        const base64String = reader.result;
        setImageBase64(base64String as string); // Set base64 string to state
        setImagePreview(base64String as string); // Set preview for the image
      };

      reader.readAsDataURL(file); // Read the file as Data URL
    }
  };

  const callApiWithImage = async () => {
    const sdk = "";
    try {
      const body = JSON.stringify({
        model: "gpt-4o",
        temperature: 0,
        response_format: { "type": "json_object" },
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "tell me the volume of the item being carried in the image; recall that the average of height of a human is 5 ft 6 in; take your best guess; return the result as json: { volume_liters: number }",
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64,
                  detail: "low",
                },
              },
            ],
          },
        ],
      });
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sdk}`,
        },
        body,
      });

      const data = await res.json();
      const contentString = data.choices[0].message.content;

      let parsedContent;

      try {
        // Try to parse the content string as JSON
        parsedContent = JSON.parse(
          contentString.replace(/```json|```/g, "").trim(),
        );
        if (parsedContent.volume_liters) {
          updateTableRow(parsedContent.volume_liters);
        }
        console.log("Parsed JSON content:", parsedContent);
      } catch (error) {
        // If parsing fails, handle the error gracefully
        console.error("Failed to parse content as JSON:", error);
        parsedContent = contentString; // Fallback to the raw content string
      }

      setApiResponse(parsedContent); // Store API response
    } catch (error) {
      console.error("Error calling the API:", error);
    }
  };

  return (
    <div style={inputBoxStyle}>
       <h2>Upload Image to Check Volume</h2>

      {/* Input to select image */}
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        style={inputStyle}
      />

      {/* Image Preview */}
      {imagePreview && (
        <div>
          <h3>Image Preview:</h3>
          <img src={imagePreview} alt="Preview" style={{ maxWidth: "300px" }} />
        </div>
      )}

      {/* Button to call API */}
      {imageBase64 && (
        <button onClick={callApiWithImage}>Upload Image to Check Volume</button>
      )}

      {/* API Response Display */}
      {apiResponse && (
        <div>
          <h3>API Response:</h3>
          <pre>{`Bag Volume in liters : ${apiResponse.volume_liters}`}</pre>
        </div>
      )}
    </div>
  );
}

// Styles
const inputStyle: React.CSSProperties = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginBottom: "20px",
  cursor: "pointer",
};


const inputBoxStyle: React.CSSProperties = {
  marginTop: "10px",
  display: "list-item",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "100%",
  zIndex: 1000,
  height: "auto",
};