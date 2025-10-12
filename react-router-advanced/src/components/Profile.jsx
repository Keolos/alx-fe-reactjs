import React from "react";
import { Link, Outlet, Routes, Route } from "react-router-dom";
import ProfileDetails from "../pages/ProfileDetails";
import ProfileSettings from "../pages/ProfileSettings";

const Profile = () => {
  return (
    <div>
      <h2>👤 Profile Page</h2>
      <nav style={{ marginBottom: "10px" }}>
        <Link to="details" style={{ marginRight: "10px" }}>
          Profile Details
        </Link>
        <Link to="settings">Profile Settings</Link>
      </nav>

      {/* Nested Routes */}
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>

      {/* Outlet renders nested routes inside Profile if you use <Outlet /> instead */}
      <Outlet />
    </div>
  );
};

export default Profile;
