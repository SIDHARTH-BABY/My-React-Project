import React, { useState } from 'react'
import './Register.css'
import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsSlice'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post('http://localhost:5000/api/user/register', values)
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        toast("redirecting to login page")
        navigate('/login')

      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error('something went wrong')
    }
  }


  const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [msg, setMsg] = useState("")


  const checkEmail = (e) => {
    setEmail(e.target.value)
    if (regex.test(email) === false) {
      setError('Please enter valid email adress')
    } else {
      setError()
      return true
    }
  }


  let submit = () => {
    if (email != '') {
      setMsg("thankyou for your" + email)
    } else {
      setError("Pleae enter email address")
    }
  }

  
  return (
    <div className='authentication'>
      <div className='aunthentication-form card p-3'>
        <h1 className='card-title'>Nice to Meet You</h1>
        <Form layout='vertical' onFinish={onFinish}>

          <Form.Item label='Name' name='name'>
            <Input placeholder='Name ' />

          </Form.Item>

          <Form.Item label='Email' name='email'>
            <Input placeholder='Email' onChange={checkEmail} />

          </Form.Item>
          <h6 className='text-danger'>{error}</h6>



          <Form.Item label='Password' name='password'>
            <Input placeholder='Password' type='password' />
          </Form.Item>
          <div className='d-flex flex-column'>
            <Button className='primary-button my-2' htmlType='submit' onClick={submit}>Register</Button>

            <h6 className='text-danger'>{msg}</h6>

            <Link to='/login' className='anchor my-2'>Click Here To Login</Link>
          </div>

        </Form>
      </div>

    </div>
  )
}

export default Register
