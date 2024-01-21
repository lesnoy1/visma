import {
  Box,
  SxProps,
  Typography,
  TypographyProps,
  useTheme,
} from '@mui/material';
import { useCallback, useContext, useMemo } from 'react';
import { AppContext } from '../../contexts/app-context';
import { HeroProps } from '../../api/api';
import HeroModal from './HeroModal';

interface HeroCellProps {
  readonly text: string;
  readonly weight?: number;
  readonly color?: TypographyProps['color'];
}
const HeroCell = ({ text, weight, color }: HeroCellProps) => {
  return (
    <Box flex={1}>
      <Typography fontWeight={weight} color={color}>
        {text}
      </Typography>
    </Box>
  );
};

interface HeroRowProps {
  readonly hero: HeroProps;
  readonly onClick: (hero: HeroProps) => void;
  readonly style: SxProps;
}
const HeroRow = ({ hero, style, onClick }: HeroRowProps) => {
  const setClickCallback = useCallback(() => {
    onClick(hero);
  }, [hero, onClick]);
  return (
    <Box key={hero.code} sx={style} onClick={setClickCallback}>
      <HeroCell text={hero.name} />
      <HeroCell text={hero.sphere_name} />
      <HeroCell text={hero.type_name} />
      <HeroCell text={hero.traits} />
    </Box>
  );
};

const HeroesList = () => {
  const theme = useTheme();
  const style = {
    head: {
      '&:hover': {
        background: theme.palette.common.white,
      },
      cursor: 'default',
    },
    row: {
      display: 'flex',
      gap: 3,
      p: 1,
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      '&:hover': {
        background: theme.palette.grey[100],
      },
      cursor: 'pointer',
    },
  };
  const { heroes, setModalHero } = useContext(AppContext);

  const onHeroClickCallback = useCallback(
    (hero: HeroProps) => {
      setModalHero(hero);
    },
    [setModalHero]
  );

  const heroesEl = useMemo(() => {
    return heroes.map((hero) => (
      <HeroRow
        key={hero.code}
        style={style.row}
        onClick={onHeroClickCallback}
        hero={hero}
      />
    ));
  }, [heroes, style.row, onHeroClickCallback]);

  return (
    <Box p={3}>
      <Box sx={{ ...style.row, ...style.head }}>
        <HeroCell text={'Name'} weight={700} color='primary' />
        <HeroCell text={'Sphere Name'} weight={700} color='primary' />
        <HeroCell text={'Type Name'} weight={700} color='primary' />
        <HeroCell text={'Traits'} weight={700} color='primary' />
      </Box>
      {heroesEl}
      <HeroModal />
    </Box>
  );
};
export default HeroesList;
