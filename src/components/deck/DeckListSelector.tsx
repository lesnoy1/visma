import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { useCallback, useContext, useMemo, useState } from 'react';
import { AppContext } from '../../contexts/app-context';

const DeckListSelector = () => {
  const theme = useTheme();
  const style = {
    root: {
      display: 'flex',
      p: 3,
      alignItems: 'center',
    },
  };
  const {
    decklistId,
    setDecklistId,
    deckList,
    deckListLoading,
    deckListError,
  } = useContext(AppContext);
  const [value, setValue] = useState<number | null>(decklistId);

  const onGoCallback = useCallback(() => {
    if (value) {
      setDecklistId(+value || 0);
    }
  }, [setDecklistId, value]);

  const onChangeCallback = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      setValue(target.value ? +target.value : 0);
    },
    []
  );

  const loadingEl = useMemo(
    () =>
      deckListLoading && (
        <Typography sx={{ color: theme.palette.grey[500] }}>
          {'Decklist loading ...'}
        </Typography>
      ),
    [deckListLoading, theme.palette.grey]
  );

  const errorEl = useMemo(
    () =>
      deckListError &&
      !deckListLoading && (
        <Typography sx={{ color: theme.palette.error.main }}>
          {'Decklist error'}
        </Typography>
      ),
    [deckListError, deckListLoading, theme.palette.error.main]
  );

  const nameEl = useMemo(
    () =>
      !deckListError &&
      !deckListLoading &&
      deckList && (
        <Typography color='primary' sx={{ fontSize: 22 }}>
          {deckList?.name || ''}
        </Typography>
      ),
    [deckList, deckListError, deckListLoading]
  );

  return (
    <Box sx={style.root}>
      <TextField
        label='Decklist ID'
        variant='outlined'
        size='small'
        type='number'
        value={value || ''}
        onChange={onChangeCallback}
      />
      <Box mx={1} />
      <Button variant='outlined' onClick={onGoCallback} disabled={!value}>
        go
      </Button>
      <Box mx={2} />
      {loadingEl}
      {errorEl}
      {nameEl}
    </Box>
  );
};

export default DeckListSelector;
