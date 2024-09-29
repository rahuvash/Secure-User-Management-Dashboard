import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/api';
import Form from '../components/Form';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (email: string, password: string) => {
    setLoading(true); // Show loader
    setErrorMessage(''); // Clear previous errors

    try {
       const signupRes =await signUp(email, password);
       if(signupRes){
         
         toast("Sign Up Succesfully.Redirecting to Login Page")
         setTimeout(() => {
          navigate('/login');
         }, 3000);
       }
      
      
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('Failed to sign up. Please try again.'); // Set error message for modal
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleCloseModal = () => {
    setErrorMessage(''); // Clear modal state on close
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-md relative">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h1>

        {/* Loader */}
        {loading && <Loader />} {/* Show loader while processing */}

        {/* Form */}
        <Form onSubmit={handleSignUp} buttonText="Sign Up" />

        {/* Already have an account link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>

        {/* Error Modal */}
        {errorMessage && <Modal message={errorMessage} onClose={handleCloseModal} />}
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
