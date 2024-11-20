"use client";
import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { UsersAPI } from '../../api/usersAPI';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/slices/userSlice';
import { useRequest } from 'ahooks';
import { ILogin } from '../../types/ILogin';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<ILogin>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { run: handleLogin, loading } = useRequest(
    async (formData: ILogin) => {
      setFormData(formData);
      //return await UsersAPI.login(formData);
      dispatch(login(formData));
    },
    {
      manual: true,
      onSuccess: () => {
        
        router.push('/exhibits');
      },
      onError: () => setError('Invalid username or password'),
    }
  );

  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      onSubmit={handleLogin}
      loading={loading}
      error={error}
      redirectLink={{ text: "Don't have an account? Sign up", href: '/register' }}
    />
  );
};

export default LoginForm;
