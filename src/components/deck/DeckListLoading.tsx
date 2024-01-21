import { Box, Skeleton } from '@mui/material';
import { useMemo } from 'react';

const DeckListLoading = () => {
  const loadingRowEl = useMemo(
    () => (
      <Box display='flex' px={3}>
        <Box flex={1} gap={3} mr={2}>
          <Skeleton height={50} />
        </Box>
        <Box flex={1} mx={1}>
          <Skeleton height={50} />
        </Box>
        <Box flex={1} mx={1}>
          <Skeleton height={50} />
        </Box>
        <Box flex={1} ml={2}>
          <Skeleton height={50} />
        </Box>
      </Box>
    ),
    []
  );
  return (
    <>
      {loadingRowEl}
      {loadingRowEl}
      {loadingRowEl}
      {loadingRowEl}
    </>
  );
};

export default DeckListLoading;
