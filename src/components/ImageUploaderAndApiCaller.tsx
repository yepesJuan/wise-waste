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
    <div style={containerStyle}>
      <div style={leftSectionStyle}>
        <h2>Upload Image to Check Volume</h2>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={inputStyle}
        />
        
        {imageBase64 && (
          <button onClick={callApiWithImage} style={uploadButtonStyle}>
            Upload Image to Check Volume
          </button>
        )}
  
        {apiResponse && (
          <div style={responseStyle}>
            <h3>Calculated Volume:</h3>
            <pre>{`Bag Volume in liters : ${apiResponse.volume_liters}`}</pre>
          </div>
        )}
      </div>
  
      {imagePreview && (
        <div style={rightSectionStyle}>
          <h3>Image Preview:</h3>
          <img src={imagePreview} alt="Preview" style={imageStyle} />
        </div>
      )}
    </div>
  );}
  
  // Styles
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
    backgroundColor: "#f8f8f8",
    borderRadius: "4px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "1200px",
    margin: "0 auto",
  };
  
  const leftSectionStyle: React.CSSProperties = {
    flex: 1,
    marginRight: "20px",
    backgroundColor: "#4CAF50",
    padding: "20px",
    borderRadius: "8px",
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };
  
  const rightSectionStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };
  
  const inputStyle: React.CSSProperties = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    cursor: "pointer",
    width: "100%",
  };
  
  const uploadButtonStyle: React.CSSProperties = {
    padding: "10px 15px",
    backgroundColor: "#006400",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s",
  };
  
  const imageStyle: React.CSSProperties = {
    maxWidth: "100%",
    maxHeight: "500px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };
  
  const responseStyle: React.CSSProperties = {
    marginTop: "20px",
    backgroundColor: "#fff",
    color: "#333",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontWeight: "bold",
  };
  