import React from "react";
import { useSelector } from "react-redux";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";

const ProfileCard = () => {
  const {user} = useSelector((state)=>state.user)
  const ProfilePage = true;
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={Profile} alt="" />
      </div>

      <div className="ProfileName">
        <span>{user? user.name : ""}</span>
        <span>Sports</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>22M</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>7</span>
            <span>Followers</span>
          </div>

          <>
            <div className="vl"></div>
            <div className="follow">
              <span>3</span>
              <span>Posts</span>
            </div>
          </>
        </div>
        <hr />
      </div>
      <span>My Profile</span>
    </div>
  );
};

export default ProfileCard;
