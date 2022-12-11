
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import "./App.css"
import { Toaster } from 'react-hot-toast'
import Home from './pages/home/Home';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Radium, { StyleRoot } from 'radium';
import Profile from './pages/Profile/Profile';


function App() {

  const { loading } = useSelector(state => state.alerts)

  const [details, setDetails] = useState({})

  const getData = async () => {

    try {
      const response = await axios.get('http://localhost:5000/api/user/get-user-info-by-id',
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }
        })
      console.log(response.data, 'haii');


      setDetails(response.data)

    } catch (error) {
      console.log('eroorrr');
      console.log(error);
    }
  }



  useEffect(() => {

    getData()

  }, [])

  return (


    <StyleRoot>
      <BrowserRouter>
        <div className="blur" style={{ top: '-18%', right: '0' }}></div>
        <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
        {loading && (
          <div className="spinner-parent">
            <div class="spinner-border text-danger" role="status">

            </div>
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />

        <Routes>
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          {/* <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}
          <Route path='/' element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </StyleRoot>


  );
}

export default App;
