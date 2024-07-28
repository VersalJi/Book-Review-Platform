import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserLogin } from "../components/user/auth/login/UserLogin";
import { UserRegister } from "../components/user/auth/register/ClientRegister";
import UserDashboard from "../components/user/dashboard/Index";
import { UserContent } from "../components/user/common/UserContent";
import Reviews from "../components/user/dashboard/Reviews/Reviews";
import { HomePage } from "../components/user/dashboard/HomePage";
import AddReview from "../components/user/dashboard/Reviews/AddReview";
import MyReviews from "../components/user/dashboard/Reviews/MyReviews";
import PublicReviews from "../components/user/dashboard/Reviews/PublicReviews";
import { UserProfile } from "../components/user/dashboard/UserProfile";

export const AppRoutes = () => {
  const storedToken = (document.cookie.match(/(?:^|; )token=([^;]*)/) || [])[1];
  useEffect(() => {
    if (storedToken) {
      // Redirect to dashboard when a token is present
      // navigate("/dashboard/home");
    }
  }, [storedToken]);
  
  return (
    <Routes>
       {storedToken ? (
        <>
          <Route element={<UserDashboard />} >
            <Route index element={<Navigate to="/dashboard/home" />} />
            <Route path="/dashboard/*" element={<UserContent />}>
              <Route index element={<Navigate to="/dashboard/home" />} />
              <Route path="home" element={<HomePage />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="my-reviews" element={<MyReviews />} />
              <Route path="reviews/add" element={<AddReview />} />
            </Route>
          </Route>       
              </>
        ) : (
          <>
            <Route index element={<Navigate to="/reviews" />}></Route>
            <Route path="/reviews" element={<PublicReviews />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
          </>
      )}
        </Routes>
      );
};


