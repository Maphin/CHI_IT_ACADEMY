import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { UsersAPI } from '../../api/usersAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/slices/userSlice';
import { useRequest } from 'ahooks';
import { ILogin } from '../../types/ILogin';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<ILogin>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { run: handleLogin, loading } = useRequest(
    async () => {
      return await UsersAPI.login(formData);
    },
    {
      manual: true,
      onSuccess: () => {
        dispatch(login(formData));
        navigate('/');
      },
      onError: () => setError('Invalid username or password'),
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      onSubmit={handleLogin}
      loading={loading}
      error={error}
      redirectLink={{ text: "Don't have an account? Sign up", href: '/register' }}
      formData={formData}
      handleChange={handleChange}
    />
  );
};

export default LoginForm;
