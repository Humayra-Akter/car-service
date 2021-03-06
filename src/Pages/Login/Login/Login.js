import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import SocialLogin from '../SocialLogin/SocialLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import axios from 'axios';

const Login = () => {
      const emailRef = useRef('');
      const passwordRef = useRef('');
      const navigate = useNavigate();
      const location = useLocation();

      let from = location.state?.from?.pathname || "/";
      let errorElement;

      const [
            signInWithEmailAndPassword,
            user,
            loading,
            error,
      ] = useSignInWithEmailAndPassword(auth);

      const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

      const handleSubmit = async event => {
            event.preventDefault();
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            await signInWithEmailAndPassword(email, password);
            const { data } = await axios.post('http://localhost:5000/login', { email });
            localStorage.setItem('accessToken', data.accessToken);
            navigate(from, { replace: true });
      }

      if (loading || sending) {
            return <Loading></Loading>
      }

      if (error) {
            errorElement = <p className='text-dander'>Error: {error?.message}</p>
      }
      if (user) {
            // navigate(from, { replace: true });
      }

      const navigateRegister = event => {
            navigate('/register');
      }

      const resetPassword = async () => {
            const email = emailRef.current.value;
            if (email) {
                  await sendPasswordResetEmail(email);
                  toast('Sent email');
            }
            else {
                  toast('please enter an email');
            }
      }

      return (
            <div className='container w-50 mx-auto'>
                  <PageTitle title="Login"></PageTitle>
                  <h2 className='text-primary text-center mt-2'>Please Login</h2>
                  <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='d-block w-50 mx-auto mb-2'>Login</Button>
                  </Form>
                  {errorElement}
                  <p>New to car service <Link to='/register' className='text-primary text-decoration-none pe-auto' onClick={navigateRegister}>Please Register</Link></p>
                  <p>Forget Password <button className='text-primary btn btn-link text-decoration-none pe-auto' onClick={resetPassword}>Reset Password</button></p>
                  <SocialLogin></SocialLogin>
                  <ToastContainer />
            </div>
      );
};

export default Login;