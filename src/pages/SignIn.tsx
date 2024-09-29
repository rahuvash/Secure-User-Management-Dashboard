import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/slices/authSlice';
import { signIn } from '../services/api';
import Form from '../components/Form';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onSignIn }: { onSignIn: () => void }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const { token } = await signIn(email, password);
      console.log('Token received:', token); // Debug log
      dispatch(setToken(token));
      localStorage.setItem('token', token);
      onSignIn(); // Trigger the re-render in App component
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error during sign in:', error); // Debug log
      setErrorMessage('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setErrorMessage('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-md relative">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h1>

        {loading && <Loader />}
        
        <Form onSubmit={handleSignIn} buttonText="Sign In" />

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>

        {errorMessage && <Modal message={errorMessage} onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default SignIn;

