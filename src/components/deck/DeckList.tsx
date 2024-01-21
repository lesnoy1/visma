import { useContext } from 'react';
import { AppContext } from '../../contexts/app-context';
import HeroesList from '../hero/HeroesList';
import DeckListLoading from './DeckListLoading';
import { Box, Typography, useTheme } from '@mui/material';

const DeckList = () => {
  const theme = useTheme();
  const { deckListLoading, deckListError, heroes } = useContext(AppContext);

  if (deckListLoading) {
    return <DeckListLoading />;
  }

  if (deckListError) {
    return (
      <Box mt={4}>
        <Typography
          textAlign={'center'}
          sx={{ color: theme.palette.error.light }}
        >
          {deckListError}
        </Typography>
      </Box>
    );
  }

  if (!deckListLoading && heroes.length) {
    return <HeroesList />;
  }
};

export default DeckList;
