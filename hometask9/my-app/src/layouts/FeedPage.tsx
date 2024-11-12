import React from 'react';
import Feed from '../components/Feed';
import { ExhibitsAPI } from '../api/exhibitsAPI';
import { Toaster } from 'react-hot-toast';

const FeedPage: React.FC = () => {
  return (
    <>
      <Toaster />
      <Feed fetchExhibits={ExhibitsAPI.exhibits} showToaster={true}/>
    </>
  )
}

export default FeedPage;
