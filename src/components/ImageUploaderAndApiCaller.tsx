"use client";
import { useState } from "react";
// import Image from "next/image";

export default function ImageUploaderAndApiCaller() {
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
      reader.onloadend = () => {
        const base64String = reader.result;
        setImageBase64(base64String as string);
        setImagePreview(base64String as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const callApiWithImage = async () => {
    const sdk = "";
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sdk}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are an assistant who responds in JSON format.",
            },
            {
              role: "user",
              content:
                "Provide the volume of a bag in liters given its dimensions: height 45 cm, width 30 cm, depth 15 cm.",
            },
          ],
          max_tokens: 300,
        }),
      });

      const data = await res.json();
      const contentString = data.choices[0].message.content;
      let parsedContent;
      try {
        parsedContent = JSON.parse(
          contentString.replace(/```json|```/g, "").trim()
        );
        console.log("Parsed JSON content:", parsedContent);
      } catch (error) {
        console.error("Failed to parse content as JSON:", error);
        parsedContent = contentString;
      }
      setApiResponse(parsedContent);
    } catch (error) {
      console.error("Error calling the API:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Upload Image and Call API</h2>

      {/* Input to select image */}
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        style={inputStyle}
      />

      {/* Image Preview */}
      {imagePreview && (
        <div style={previewContainerStyle}>
          <h3 style={previewHeaderStyle}>Image Preview:</h3>
          <img src={imagePreview} alt="Preview" style={imageStyle} />
        </div>
      )}

      {/* Button to call API */}
      {imageBase64 && (
        <button onClick={callApiWithImage} style={buttonStyle}>
          Call API with Image
        </button>
      )}

      {/* API Response Display */}
      {apiResponse && (
        <div style={responseContainerStyle}>
          <h3 style={responseHeaderStyle}>API Response:</h3>
          <pre
            style={responseTextStyle}
          >{`Bag Height in cm : ${apiResponse.height_cm}`}</pre>
          <pre
            style={responseTextStyle}
          >{`Bag Depth in cm : ${apiResponse.depth_cm}`}</pre>
          <pre
            style={responseTextStyle}
          >{`Bag Width in cm : ${apiResponse.width_cm}`}</pre>
          <pre
            style={responseTextStyle}
          >{`Bag Volume in liters : ${apiResponse.volume_liters}`}</pre>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  background: "#f9f9f9",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "600px",
  margin: "10px auto",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const headerStyle: React.CSSProperties = {
  marginBottom: "20px",
  color: "#333",
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginBottom: "20px",
  cursor: "pointer",
};

const previewContainerStyle: React.CSSProperties = {
  marginBottom: "20px",
};

const previewHeaderStyle: React.CSSProperties = {
  color: "#555",
  marginBottom: "10px",
};

const imageStyle: React.CSSProperties = {
  maxWidth: "100%",
  height: "auto",
  borderRadius: "8px",
  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
  transition: "background-color 0.3s ease",
};

const responseContainerStyle: React.CSSProperties = {
  marginTop: "20px",
  textAlign: "left",
  background: "#fff",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
};

const responseHeaderStyle: React.CSSProperties = {
  marginBottom: "10px",
  color: "#333",
};

const responseTextStyle: React.CSSProperties = {
  margin: "0",
  color: "#666",
  fontSize: "14px",
};
