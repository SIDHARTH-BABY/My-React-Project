import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";


function ProtectedRoute(props) {

  const {user} = useSelector((state)=>state.user)
 const dispatch = useDispatch()
  const navigate = useNavigate()

  const getUser = async () => {

    try {
      const response = await axios.get('http://localhost:5000/api/user/get-user-info-by-id',
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }
        })
      console.log(response.data, 'haii');

      if(response.data.success){
        dispatch(setUser(response.data.data))

      }else{
       navigate('/login')
      }

     

    } catch (error) {
      console.log('eroorrr');
      console.log(error);
      navigate('/login')
    }
  }

  useEffect(() => {
if(!user){
  getUser()
}
  

  }, [user])



  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
