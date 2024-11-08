import React, { useState } from 'react';
import { IExhibit } from '../types/IExhibit';
import { useRequest } from 'ahooks';
import { Box, CircularProgress, Typography, Container } from '@mui/material';
import Post from '../components/Posts/Post';
import Paginator from '../components/common/Paginator';

interface FeedProps {
  fetchExhibits: (page: number, limit: number) => Promise<IExhibit[] | any>;
}

const Feed: React.FC<FeedProps> = ({ fetchExhibits }) => {
  const [page, setPage] = useState<number>(1);
  const [exhibits, setExhibits] = useState<IExhibit[] | null>(null);
  const [lastPage, setLastPage] = useState<number | null>(null);
  //const [total, setTotal] = useState<number | null>(null);
  const limit = 10;

  const { run: loadExhibits, loading, error } = useRequest(() => fetchExhibits(page, limit), {
    refreshDeps: [page],
    onSuccess: (response) => {
      setExhibits(response.data.data);
      setLastPage(response.data.lastPage);
    }
  });

  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container sx={{ py: 8 }}>
      {exhibits && lastPage ? (
        <Box mb={6} display="flex" justifyContent="center">
          <Paginator page={page} lastPage={lastPage} handlePageChange={handlePageChange}/>
        </Box>
      ) : null}

      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto' }} />}

      {error && (
        <Typography color="error" align="center">
          Failed to load exhibits. Please try again.
        </Typography>
      )}

      {!loading && exhibits && exhibits.length === 0 && (
        <Typography color="textSecondary" align="center">
          No exhibits found.
        </Typography>
      )}

      {exhibits && exhibits.map((exhibit: IExhibit) => (
          <Post key={exhibit.id} exhibit={exhibit} loadExhibits={loadExhibits}/>
      ))}

      {exhibits && lastPage ? (
        <Box mt={6} display="flex" justifyContent="center">
          <Paginator page={page} lastPage={lastPage} handlePageChange={handlePageChange}/>
        </Box>
      ) : null}
    </Container>
  );
};

export default Feed;
