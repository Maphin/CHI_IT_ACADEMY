import React from 'react';
import { ExhibitsAPI } from '../api/exhibitsAPI';
import Feed from '../components/Feed';

const MyPostsPage: React.FC = () => {
  return <Feed fetchExhibits={ExhibitsAPI.myExhibits} showToaster={false}/>;
};

export default MyPostsPage;
