 
import { FaArrowLeftLong } from "react-icons/fa6";
import "./style.css";
import { Link } from "react-router-dom";

function ProfileScreen({ profiledata }) {
  console.log(profiledata);
  const initials = profiledata?.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return (
    <>
      <Link to="/" className="welcomenote">
        <FaArrowLeftLong style={{ position: "relative", top: "3px" }} />
        <span>Welcome,{profiledata.name}</span>
      </Link>
      <div className="user">
        <div className="profilename">
          <div className="name-initial-container">
            <p className="name-initial">{initials}</p>
          </div>
          <div>
            <h3>{profiledata.name}</h3>
            <p>{profiledata.email}</p>
          </div>
        </div>
        <div>
          <div className="userDetails">
            <div>
            <label  htmlFor="userId">User ID</label>
            <input className="input" id="userId" value={profiledata.id} readOnly />
          </div>
          <div>
            <label htmlFor="userName">Name</label>
            <input className="input" id="userName" value={profiledata.name} readOnly />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input className="input" id="email" value={profiledata.email} readOnly />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              className="input"
              id="address"
              value={profiledata.address.city} readOnly
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input className="input" id="phone" value={profiledata.phone} readOnly />
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfileScreen;
