import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'

const Regster = () => {
      const navigate = useNavigate();
      const navigateLogin = event => {
            navigate('/login');
      }

      const handleSubmit = event => {
            event.preventDefault();
      }
      return (
            <div className='register-form'>
                  <h2 style={{ textAlign: 'center' }}>Please Register</h2>
                  <form onSubmit={handleSubmit}>
                        <input type="text" name="name" id="" placeholder='Your name' required />
                        <input type="email" name="email" id="" placeholder='Your Email' required />
                        <input type="password" name="password" id="" placeholder='Password' required />
                        <input type="submit" value="Register" />
                  </form>
                  <p>Already have an account <Link to='/login' className='text-danger text-decoration-none pe-auto' onClick={navigateLogin}>Please Login</Link></p>
            </div >
      );
};

export default Regster;