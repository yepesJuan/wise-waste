// import Image from "next/image";
// import styles from "./page.module.css";
"use client"

// src/app/page.tsx
import dynamic from "next/dynamic";
import Table from "../components/Table";
import ImageUploaderAndApiCaller from "@/components/ImageUploaderAndApiCaller";
import React, { useState } from "react";
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});


export default function Home() {
  const [tableData, setTableData] = useState([
    { stand: "281", Bin_Volume: "3002", street: "Sanibel", binPercentage: 40 },
    { stand: "345", Bin_Volume: "4023", street: "Lagos de campa", binPercentage: 70 },
    { stand: "754", Bin_Volume: "2564", street: "Versales garden", binPercentage: 80 },
    { stand: "232", Bin_Volume: "3040", street: "Woodmount", binPercentage: 56 },
    { stand: "289", Bin_Volume: "3002", street: "Haitus", binPercentage: 40 },
    { stand: "078", Bin_Volume: "4023", street: "Walmart Neighborhood Market", binPercentage: 90 },
    { stand: "134", Bin_Volume: "2564", street: "Lakeview", binPercentage: 20 },
    { stand: "467", Bin_Volume: "3040", street: "Emrald", binPercentage: 30 },
  ]);
  

  const updateTableRow = (newVolume: number) => {
    setTableData((prevData) => {
      const updatedData = [...prevData];

      const currentVolume = parseInt(updatedData[0].Bin_Volume, 10);
      const totalVolume = currentVolume + newVolume;
  
      const updatedBinPercentage = ((totalVolume / currentVolume) * updatedData[0].binPercentage).toFixed(2);
  
      updatedData[0] = {
        ...updatedData[0],
        Bin_Volume: totalVolume.toString(),
        binPercentage: parseFloat(updatedBinPercentage),
      };
      
      return updatedData;
    });
  };
  try {
    return (
      <div className="dashboard">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "60%" }}>
            <Map />
          </div>
          <div style={{ width: "35%" }}>
            <Table data={tableData}/>
            <ImageUploaderAndApiCaller updateTableRow={updateTableRow}></ImageUploaderAndApiCaller>

          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    return <div>Error loading dashboard.</div>;
  }
}
