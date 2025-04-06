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
    <div className="sweet-loading">

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