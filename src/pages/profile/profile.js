import "./profile.css";

import NavBar from "../../components/navBar/navBar";
import ProfileSkeleton from "./profileSkeleton";
import Footer from "../../components/footer/footer";

import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import baseUrl from "../../config/config";
import cookieManager from "../../utils/cookieManager";

export default function Profile() {
  const { data: userData, fetchData: fetchUserData } = useFetch();

  useEffect(() => {
    const JWTToken = `Bearer ${cookieManager("get", "JWTToken")}`;

    fetchUserData({
      url: `${baseUrl}/users/mydata`,
      method: "get",
      headers: {
        Authorization: JWTToken,
      },
    });
  }, [fetchUserData]);

  if (userData.status === "loading") {
    return (
      <>
        <NavBar />
        <ProfileSkeleton />
        <Footer />
      </>
    );
  }

  if (userData.status === "succeeded") {
    return (
      <>
        <NavBar />
        <div className="profile_container">
          <div className="container">
            <div className="profile_header">
              <div className="profile_info">
                <div className="profile_image">
                  <img
                    src={userData.data?.data.profileImage || ""}
                    alt="Profile"
                    onError={(e) => {
                      e.target.src = require("../../imgs/profile-user.png");
                    }}
                  />
                </div>
                <div className="user_details">
                  <h1>
                    {userData.data?.data.firstName}{" "}
                    {userData.data?.data.lastName}
                  </h1>
                  <p className="user_role">{userData.data?.data.role}</p>
                </div>
              </div>
            </div>

            <div className="profile_sections">
              <div className="section personal_info">
                <h2>Personal Information</h2>
                <div className="info_grid">
                  <div className="info_item">
                    <div className="info_content">
                      <label>Full Name</label>
                      <p>
                        {userData.data?.data.firstName}{" "}
                        {userData.data?.data.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="info_item">
                    <div className="info_content">
                      <label>Email</label>
                      <p>{userData.data?.data.email}</p>
                    </div>
                  </div>
                  <div className="info_item">
                    <div className="info_content">
                      <label>Phone Number</label>
                      <p style={{
                        color: !userData.data?.data.phoneNumber ? "var(--color-of-error)" : ""
                      }}>{userData.data?.data.phoneNumber || "Phone number not found."}</p>
                    </div>
                  </div>
                </div>
              </div>

              {userData.data?.data.addressesList.length > 0 && (
                <div className="section address_info">
                  <h2>Address Information</h2>
                  {userData.data?.data.addressesList.map((address) => (
                    <div key={address._id} className="address_card">
                      <div className="address_details">
                        <p>
                          <span>Country:</span> {address.country}
                        </p>
                        <p>
                          <span>State:</span> {address.state}
                        </p>
                        <p>
                          <span>City:</span> {address.city}
                        </p>
                        <p>
                          <span>Street:</span> {address.street}
                        </p>
                        <p>
                          <span>Postal Code:</span> {address.postalCode}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
