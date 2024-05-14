"use client";

import React from "react";
import useSWR from "swr";
import axios from "../axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Header = () => {
  const { data: user } = useSWR("http://localhost/api/user", fetcher);

  return (
    <div className="w-screen text-white bg-main p-5 flex justify-between items-center">
      <div className="text-xl font-bold ml-2">
        <button>QuickTutor</button>
      </div>
      <div className="text-normal font-bold flex space-x-12 mr-4">
        <span>{user ? user.role_name : " "}</span>
        <button>{user ? user.username : " "}</button>
      </div>
    </div>
  );
};

export default Header;
