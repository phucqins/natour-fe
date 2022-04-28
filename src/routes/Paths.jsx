import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import TourDetail from "../pages/TourDetail";
import UserProfile from "../pages/UserProfile";
import Login from "../pages/Login";
import { useSelector } from "react-redux";

const Paths = () => {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tours/:id" element={<TourDetail />} />
      {isLoggedIn && <Route path="/me" element={<UserProfile />} />}
      {!isLoggedIn && <Route path="/login" element={<Login />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Paths;
