import React from 'react';
import Feed from '../components/Feed';
import { ExhibitsAPI } from '../api/exhibitsAPI';

const FeedPage: React.FC = () => {
  return <Feed fetchExhibits={ExhibitsAPI.exhibits}/>
}

export default FeedPage;
