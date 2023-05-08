import Input from '@/components/Input';
import axios from 'axios';
import React, { useCallback, useState } from 'react';

import { signIn } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setvariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setvariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'));
  }, []);

  const login = useCallback(async () => {

    try {
      await signIn('credentials', {
        email, password,
        callbackUrl: '/profiles'
      })
    } catch (err) {
      console.log(err)
    }

  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name: userName,
        password
      });

      login()
    } catch (error) {
      console.log(error);
    }
  }, [email, userName, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-center bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12"></img>
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  label="UserName"
                  onChange={(event: any) => {
                    setUserName(event.target.value);
                  }}
                  id="username"
                  type="userName"
                  value={userName}
                />
              )}
              <Input
                label="Email"
                onChange={(event: any) => {
                  setEmail(event.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(event: any) => {
                  setPassword(event.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === 'login' ? 'Sign in' : 'Sign up'}
            </button>
            <p className="text-neutral-500 mt-12 self-center">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
