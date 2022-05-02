import React from 'react';
import googleLogo from '../../../images/googleLogo.webp'
import fbLogo from '../../../images/fbLogo.png'
import github from '../../../images/github.webp'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const SocialLogin = () => {
      const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
      const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
      const navigate = useNavigate();
      let errorElement;

      if (loading || loading1) {
            return <Loading></Loading>
      }

      if (error || error1) {
            errorElement = <p className='text-dander'>Error: {error?.message} {error1?.message}</p>
      }

      if (user || user1) {
            navigate('/home');
      }

      return (
            <div>
                  <div className='d-flex align-items-center'>
                        <div style={{ height: '1px' }} className='bg-primary w-50'></div>
                        <p className='mt-2 px-2'>or</p>
                        <div style={{ height: '1px' }} className='bg-primary w-50'></div>
                  </div>
                  {errorElement}
                  <div>
                        <button
                              onClick={() => signInWithGoogle()}
                              className='btn btn-primary w-50 mx-auto d-block'>
                              <img height={30} width={30} src={googleLogo} alt="" />
                              <span className='px-3'>SignIn With Google</span>
                        </button>
                        <button className='btn btn-primary w-50 mx-auto d-block mt-4'>
                              <img height={30} width={30} src={fbLogo} alt="" />
                              <span className='px-3'>SignIn With Facebook</span>
                        </button>
                        <button
                              onClick={() => signInWithGithub()}
                              className='btn btn-primary w-50 mx-auto d-block mt-4'>
                              <img height={30} width={30} src={github} alt="" />
                              <span className='px-3'>SignIn With Github</span>
                        </button>
                  </div>
            </div>
      );
};

export default SocialLogin;