import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/profileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";
function Home() {
  // const {user} = useSelector((state)=>state.user)
  return (

    <div className="Home ">
      {/* <h1>{user? user.name : ""}</h1> */}
    
      <ProfileSide />
      <PostSide />
      <RightSide />

   
    </div>
  );
}

export default Home;
