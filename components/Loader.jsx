"use client"

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

export default function Loader() {
  let color = "#ffffff";

  return (
    <>
    <div className="sweet-loading"
      style={{
        position: "absolute", // Ensure it's positioned relative to the viewport
        top: "0",
        left: "0",
        width: "100vw", // Take up the full width of the viewport
        height: "100vh", // Take up the full height of the viewport
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: add a semi-transparent background
      }}
    >

      <ClipLoader
        color={color}
        loading={true}
        override={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </>
  );
}