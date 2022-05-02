import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';

const Regster = () => {
      const [agree, setAgree] = useState(false);
      const [
            createUserWithEmailAndPassword,
            user,
            loading,
            error,
      ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

      const [updateProfile, updating, updateError] = useUpdateProfile(auth);

      const navigate = useNavigate();
      const navigateLogin = event => {
            navigate('/login');
      }

      // if (user) {

      // }

      const handleRegister = async (event) => {
            event.preventDefault();
            const name = event.target.name.value;
            const email = event.target.email.value;
            const password = event.target.password.value;

            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });
            alert('Updated profile');
            navigate('/home');
      }

      return (
            <div className='register-form'>
                  <h2 style={{ textAlign: 'center' }}>Please Register</h2>
                  <form onSubmit={handleRegister}>
                        <input type="text" name="name" id="" placeholder='Your name' required />
                        <input type="email" name="email" id="" placeholder='Your Email' required />
                        <input type="password" name="password" id="" placeholder='Password' required />
                        <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                        <label className={agree ? 'ps-2 text-primary' : 'ps-2 text-danger'} htmlFor="terms">Accept Car Service Terms & Conditons</label>
                        <input
                              disabled={!agree}
                              className='btn btn-primary w-50 mx-auto mt-2'
                              type="submit"
                              value="Register" />
                  </form>
                  <p>Already have an account <Link to='/login' className='text-primary text-decoration-none pe-auto' onClick={navigateLogin}>Please Login</Link></p>
                  <SocialLogin></SocialLogin>
            </div >
      );
};

export default Regster;