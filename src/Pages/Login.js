import { Divider, Input } from '@mantine/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsShieldLock } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { MdAlternateEmail } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SmallLoader from '../Components/SmallLoader';
import { AuthContext } from '../contexts/UserContext';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signInWithMailAndPass, updateUserProfile, signInWithProvider } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.path || '/';

  const handleLogin = (data) => {
    const { name, email, password } = data;

    setIsLoading(true);

    signInWithMailAndPass(email, password)
      .then(() => {
        updateUserProfile(name).then(() => {
          toast.success('Logged in successfully');
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
        toast.success('Logged in successfull');
        navigate(from);
        setGoogleLoading(false);
      })
      .catch((error) => {
        setGoogleLoading(false);
        toast.error(error.message.replace('Firebase: ', ''));
      });
  };

  return (
    <div className="h-screen flex justify-center items-center container w-[95%] mx-auto">
      <div className="w-full">
        <h2 className="text-center text-2xl font-medium">Login</h2>
        <div className="mt-4 w-full lg:w-[400px] m-auto border border-black p-12">
          <form className="" onSubmit={handleSubmit(handleLogin)}>
            <Input
              placeholder="Email"
              icon={<MdAlternateEmail />}
              type="email"
              {...register('email', { required: 'Image is required' })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <Input
              placeholder="Password"
              icon={<BsShieldLock />}
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Wrong password!' },
              })}
              className="mt-2"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <p className="my-1">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="cursor-pointer underline decoration-blue-600 text-blue-600"
              >
                Register
              </Link>
            </p>
            <button className="btn-primary w-full">
              {' '}
              {isLoading ? <SmallLoader /> : 'Login'}
            </button>
            <Divider my="xs" label="Or" labelPosition="center" />
          </form>
          <button
            className="btn-primary w-full flex justify-center items-center gap-2"
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
