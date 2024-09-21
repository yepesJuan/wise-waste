"use client";

import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <div style={iconContainerStyle}>
        <Image
          src="/images/iot-truck.png"
          alt="IoT Icon"
          width={80}
          height={70}
        />
      </div>

      <h1 style={titleStyle}>WiseWaste</h1>
    </nav>
  );
};

const navbarStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px 20px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  position: "fixed",
  width: "100%",
  top: 0,
  zIndex: 1000,
  height: "70px",
};

const iconContainerStyle: React.CSSProperties = {
  position: "absolute",
  left: "20px",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "28px",
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
  flex: 1,
};

export default Navbar;
