import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './layouts/LoginPage';
import RegisterPage from './layouts/RegisterPage';
import FeedPage from './layouts/FeedPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import MyPostsPage from './layouts/MyPostsPage';
import CreatePostPage from './layouts/CreatePostPage';

const App: React.FC = () => {
  const userAuthStatus = useSelector((state: RootState) => state.user.status);

  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<FeedPage />}/>
          <Route path="/login" element={
            <ProtectedRoute userStatus={userAuthStatus} access={"loggedOutOnly"}>
              <LoginPage />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <ProtectedRoute userStatus={userAuthStatus} access={"loggedOutOnly"}>
              <RegisterPage />
            </ProtectedRoute>
          } />
          <Route path="/my-posts" element={
            <ProtectedRoute userStatus={userAuthStatus} access={"loggedInOnly"}>
              <MyPostsPage />
            </ProtectedRoute>
          } />
          <Route path="/create-post" element={
            <ProtectedRoute userStatus={userAuthStatus} access={"loggedInOnly"}>
              <CreatePostPage />
            </ProtectedRoute>
          } />
        </Routes>
    </Router>
  );
};

export default App;
