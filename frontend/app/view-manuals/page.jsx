import React from 'react';
import Header from '../_components/Header';
import ViewModeSidebar from '../_components/ViewModeSidebar';

const ViewManuals = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-baseColor">
      <Header />
      <div className="w-1/6 flex-grow">
        <ViewModeSidebar />
      </div>
    </div>
  );
};

export default ViewManuals;
