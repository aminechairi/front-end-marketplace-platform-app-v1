import "./profileSkeleton.css";

export default function ProfileSkeleton() {
  return (
    <div className="profile_container_skeleton">
      <div className="container">
        <div className="profile_header">
          <div className="profile_info">
            <div className="profile_image">
              <img src={require("../../imgs/profile-user.png")} alt="Profile" />
            </div>
            <div className="user_details">
              <h1>Amine Messeiyah</h1>
              <p className="user_role">Customer</p>
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
                  <p>John Doe</p>
                </div>
              </div>
              <div className="info_item">
                <div className="info_content">
                  <label>Email</label>
                  <p>john.doe@example.com</p>
                </div>
              </div>
              <div className="info_item">
                <div className="info_content">
                  <label>Phone Number</label>
                  <p>+1 123-456-7890</p>
                </div>
              </div>
            </div>
          </div>

          <div className="section address_info">
            <h2>Address Information</h2>
            <div className="address_card">
              <div className="address_details">
                <p>
                  <span>Country:</span> United States
                </p>
                <p>
                  <span>State:</span> California
                </p>
                <p>
                  <span>City:</span> Los Angeles
                </p>
                <p>
                  <span>Street:</span> 123 Main St
                </p>
                <p>
                  <span>Postal Code:</span> 90001
                </p>
              </div>
            </div>
            <div className="address_card">
              <div className="address_details">
                <p>
                  <span>Country:</span> United States
                </p>
                <p>
                  <span>State:</span> New York
                </p>
                <p>
                  <span>City:</span> New York City
                </p>
                <p>
                  <span>Street:</span> 456 Park Ave
                </p>
                <p>
                  <span>Postal Code:</span> 10022
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
