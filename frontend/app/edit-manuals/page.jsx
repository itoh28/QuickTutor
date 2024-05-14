import React from "react";
import Header from "../_components/Header";
import EditModeSidebar from "../_components/EditModeSidebar";

const EditManuals = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-base">
      <Header />
      <div className="w-1/6 flex-grow">
        <EditModeSidebar />
      </div>
    </div>
  );
};

export default EditManuals;
