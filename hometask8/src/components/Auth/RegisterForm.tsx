import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { UsersAPI } from '../../api/usersAPI';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { ILogin } from '../../types/ILogin';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<ILogin>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { run: handleRegister, loading } = useRequest(
    async () => {
      return await UsersAPI.register(formData);
    },
    {
      manual: true,
      onSuccess: () => navigate('/login'),
      onError: () => setError('Registration failed'),
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AuthForm
      title="Sign Up"
      buttonText="Register"
      onSubmit={handleRegister}
      loading={loading}
      error={error}
      redirectLink={{ text: 'Already have an account? Sign in', href: '/login' }}
      formData={formData}
      handleChange={handleChange}
    />
  );
};

export default RegisterForm;