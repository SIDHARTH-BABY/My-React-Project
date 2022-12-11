import React, { useEffect } from "react";

import { Navigate, useNavigate } from "react-router-dom";


function ProtectedRoute(props) {

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
