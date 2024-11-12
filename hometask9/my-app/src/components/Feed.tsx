import React, { useCallback, useEffect, useState } from 'react';
import { IExhibit } from '../types/IExhibit';
import { useRequest } from 'ahooks';
import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import PaginatorWrapper from './common/PaginatorWrapper';
import { useSocket } from '../hooks/useSocket';
import useToast from '../hooks/useToast';
import Exhibits from './Posts/Exhibits';

interface FeedProps {
  fetchExhibits: (page: number, limit: number) => Promise<IExhibit[] | any>;
  showToaster?: boolean
}

const Feed: React.FC<FeedProps> = ({ fetchExhibits, showToaster }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [exhibits, setExhibits] = useState<IExhibit[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const { newPostData } = useSocket();
  const { newExhibitNotification } = useToast();

  const { run: loadExhibits, loading, error } = useRequest(() => fetchExhibits(page, limit), {
    refreshDeps: [page, limit],
    onSuccess: handleExhibitResponse
  });

  useEffect(() => {
    if (showToaster && newPostData) {
      if (page === 1) {
        loadExhibits();
      } else {
        newExhibitNotification(`${newPostData.user} created a new post`);
      }
    }
  }, [newPostData])

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      setSearchParams({ page: newPage.toString(), limit: limit.toString() });
    },
    [limit, setSearchParams]
  );

  function handleExhibitResponse(response: any) {
    setExhibits(response.data.data);
    setLastPage(response.data.lastPage);
  }

  return (
    <Container sx={{ py: 8 }}>
      <PaginatorWrapper page={page} lastPage={lastPage} onChange={handlePageChange} />
      <Exhibits loading={!showToaster ? loading : null} error={error} exhibits={exhibits} onReload={loadExhibits}/>
      <PaginatorWrapper page={page} lastPage={lastPage} onChange={handlePageChange} />
    </Container>
  );
};

export default Feed;
