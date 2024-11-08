import React, { useState } from 'react';
import { IExhibit } from '../types/IExhibit';
import { useRequest } from 'ahooks';
import { CircularProgress, Typography, Container } from '@mui/material';
import Post from '../components/Posts/Post';
import { useSearchParams } from 'react-router-dom';
import PaginatorWrapper from './common/PaginatorWrapper';

interface FeedProps {
  fetchExhibits: (page: number, limit: number) => Promise<IExhibit[] | any>;
}

const Feed: React.FC<FeedProps> = ({ fetchExhibits }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [exhibits, setExhibits] = useState<IExhibit[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const { run: loadExhibits, loading, error } = useRequest(() => fetchExhibits(page, limit), {
    refreshDeps: [page],
    onSuccess: (response) => {
      setExhibits(response.data.data);
      setLastPage(response.data.lastPage);
    }
  });

  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  const renderMessage = (message: string) => (
    <Typography color="textSecondary" align="center">
      {message}
    </Typography>
  );

  return (
    <Container sx={{ py: 8 }}>
      {lastPage > 1 && (
        <PaginatorWrapper page={page} lastPage={lastPage} onChange={handlePageChange} />
      )}

      {loading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto' }} />
      ) : error ? (
        renderMessage('Failed to load exhibits. Please try again.')
      ) : exhibits.length === 0 ? (
        renderMessage('No exhibits found.')
      ) : (
        exhibits.map((exhibit) => (
          <Post key={exhibit.id} exhibit={exhibit} loadExhibits={loadExhibits} />
        ))
      )}

      {lastPage > 1 && (
        <PaginatorWrapper page={page} lastPage={lastPage} onChange={handlePageChange} />
      )}
    </Container>
  );
};

export default Feed;
