// import Image from "next/image";
// import styles from "./page.module.css";

// src/app/page.tsx
import dynamic from "next/dynamic";
import Table from "../components/Table";
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  try {
    return (
      <div className="dashboard">
        <h1>Wise Waste</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "60%" }}>
            <Map />
          </div>
          <div style={{ width: "35%" }}>
            <Table />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    return <div>Error loading dashboard.</div>;
  }
}
