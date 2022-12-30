import React from 'react'
import { Divider, Input } from '@mantine/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiUserCircle } from 'react-icons/bi';
import { BsShieldLock } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { MdAlternateEmail } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SmallLoader from '../Components/SmallLoader';
import { AuthContext } from '../contexts/UserContext';


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const {
    createUserWithMailAndPass,
    updateUserProfile,
    logout,
    signInWithProvider,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();

  const from = location?.state?.path || '/';

  const handleRegister = (data) => {
    const { name, email, password } = data;

    setIsLoading(true);

    createUserWithMailAndPass(email, password)
      .then(() => {
        updateUserProfile(name).then(() => {
          toast.success('User created successfully');
          logout(false);
          setIsLoading(false);
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message.replace('Firebase: ', ''));
      });
  };

  const handleGoogleSignUp = () => {
    setGoogleLoading(true);
    const googleProvider = new GoogleAuthProvider();
    signInWithProvider(googleProvider)
      .then(() => {
        toast.success('Logged in successfully');
        setGoogleLoading(false);
        navigate(from);
      })
      .catch((error) => {
        setGoogleLoading(false);
        toast.error(error.message.replace('Firebase: ', ''));
      });
  };

  return (
    <div className="h-screen flex justify-center items-center container w-[95%] mx-auto">
      <div className="w-full">
        <h2 className="text-center text-2xl font-medium">Register</h2>
        <div className="mt-4 w-full lg:w-[400px] m-auto border border-black p-12">
          <form onSubmit={handleSubmit(handleRegister)}>
            <Input
              placeholder="Name"
              type="text"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <Input
              placeholder="Email"
              type="email"
              className="mt-2"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <Input
              placeholder="Password"
              
              type="password"
              className="mt-2"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <p className="my-1">
              Already have an account?{' '}
              <Link
                to="/login"
                className="cursor-pointer underline decoration-blue-600 text-blue-600"
              >
                Login
              </Link>
            </p>
            <button
              className={`bg-indigo-500 py-2 text-white w-full ${isLoading && 'bg-gray-700'}`}
            >
              {isLoading ? <SmallLoader /> : 'Register'}
            </button>
            <Divider my="xs" label="Or" labelPosition="center" />
          </form>
          <button
            className="bg-indigo-500 py-2 text-white w-full flex justify-center items-center gap-2"
            onClick={handleGoogleSignUp}
          >
            <FcGoogle className={`${googleLoading ? 'hidden' : ''}`} />
            {googleLoading ? (
              <FcGoogle className="text-xl animate-spin" />
            ) : (
              'Google Sign Up'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register

