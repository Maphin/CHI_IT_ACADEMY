"use client";
import React, { useEffect } from 'react';
import { IExhibit } from '../types/IExhibit';
import { Container } from '@mui/material';
import PaginatorWrapper from './common/PaginatorWrapper';
import { useSocket } from '../hooks/useSocket';
import useToast from '../hooks/useToast';
import Exhibits from './Posts/Exhibits';
import { ExhibitsAPI } from '@/api/exhibitsAPI';
import { Toaster } from 'react-hot-toast';

interface FeedProps {
  //fetchExhibits: (page: number, limit: number) => Promise<IExhibit[] | any>;
  initialExhibits: IExhibit[];
  limit: number;
  page: number;
  lastPage: number;
  showToaster?: boolean;
}

const Feed: React.FC<FeedProps> = ({ initialExhibits, limit, page, lastPage, showToaster }) => {
  const { newPostData } = useSocket();
  const { newExhibitNotification } = useToast();

  // const { run: loadExhibits, loading, error } = useRequest(() => ExhibitsAPI.exhibits(searchParams.page, searchParams.limit), {
  //   refreshDeps: [searchParams.page, searchParams.limit],
  //   onSuccess: handleExhibitResponse
  // });

  useEffect(() => {
    if (showToaster && newPostData) {
      newExhibitNotification(`${newPostData.user} created a new post`);
    }
  }, [newPostData])
  
  return (
    <Container sx={{ py: 8 }}>
      <Toaster />
      <PaginatorWrapper page={page} lastPage={lastPage} />
      <Exhibits exhibits={initialExhibits} loading={!initialExhibits}
      //loading={!showToaster ? loading : null} 
      //onReload={loadExhibits}
      //error={error}
      />
      <PaginatorWrapper page={page} lastPage={lastPage} />
    </Container>
  );
};

export default Feed;
