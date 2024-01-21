import { useCallback, useContext } from 'react';
import { Box, Dialog, IconButton, Typography, useTheme } from '@mui/material';
import { AppContext } from '../../contexts/app-context';
import CloseIcon from '@mui/icons-material/Close';
import { HeroProps } from '../../api/api';

const imgPath = import.meta.env.VITE_APP_IMG_PATH || '';

interface HeroModalLabelValueProps {
  readonly label: string;
  readonly value?: string | number | React.ReactNode;
}

const HeroModalLabelValue = ({ label, value }: HeroModalLabelValueProps) => {
  const theme = useTheme();
  return (
    <Box my={2}>
      <Typography sx={{ color: theme.palette.grey[600] }}>{label}</Typography>
      <Typography sx={{ fontSize: 18 }}>{value}</Typography>
    </Box>
  );
};

interface HeroModalIndicatorsProps {
  readonly attack: HeroProps['attack'];
  readonly defense: HeroProps['defense'];
  readonly health: HeroProps['health'];
  readonly threat: HeroProps['threat'];
}
const HeroModalIndicators = ({
  attack,
  defense,
  health,
  threat,
}: HeroModalIndicatorsProps) => {
  const theme = useTheme();
  const style = {
    value: {
      color: theme.palette.grey[700],
      background: theme.palette.grey[300],
      borderRadius: '50%',
      width: '4rem',
      height: '4rem',
      lineHeight: '4rem',
      fontSize: 24,
      textAlign: 'center',
      margin: 'auto',
      boxShadow: theme.shadows[4],
    },
  };
  return (
    <>
      <Box display={'flex'} textAlign={'center'}>
        {['Attack', 'Defense', 'Health', 'Threat'].map((val, index) => (
          <Box flex={1} key={`${val}-${index}-label`}>
            <Typography sx={{ color: theme.palette.grey[600] }}>
              {val}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box display={'flex'} mt={1.5}>
        {[attack, defense, health, threat].map((val, index) => (
          <Box flex={1} key={`${val}-${index}-value`} textAlign={'center'}>
            <Typography sx={style.value}>{val}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};

const HeroModal = () => {
  const { setModalHero, modalHero } = useContext(AppContext);
  const theme = useTheme();
  const style = {
    paper: {
      height: 'auto',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      background: theme.palette.grey[100],
      px: 3,
      py: 1,
    },
    body: {
      display: 'flex',
      p: 4,
    },
    img: {
      width: '20rem',
      boxShadow: theme.shadows[6],
      borderRadius: '16px',
    },
    text: {
      p: 4,
      pt: 0,
    },
  };

  const onCloseCallback = useCallback(() => {
    setModalHero(null);
  }, [setModalHero]);

  return (
    <Dialog
      open={Boolean(modalHero)}
      fullWidth
      maxWidth='md'
      PaperProps={{
        elevation: 1,
      }}
      onClose={onCloseCallback}
    >
      <Box sx={style.paper}>
        <Box sx={style.title}>
          <Typography sx={{ fontSize: 22 }}>{modalHero?.name}</Typography>
          <Box flex={1} />
          <IconButton onClick={onCloseCallback}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={style.body}>
          <Box flex={1} mr={2}>
            <HeroModalIndicators
              attack={modalHero?.attack || 0}
              defense={modalHero?.defense || 0}
              health={modalHero?.health || 0}
              threat={modalHero?.threat || 0}
            />
            <Box mt={4} />
            <HeroModalLabelValue label={'Pack'} value={modalHero?.pack_name} />
            <HeroModalLabelValue label={'Traits'} value={modalHero?.traits} />
            <HeroModalLabelValue
              label={'Sphere'}
              value={modalHero?.sphere_name}
            />
            <HeroModalLabelValue
              label={'Flavor'}
              value={
                <span
                  dangerouslySetInnerHTML={{ __html: modalHero?.flavor || '' }}
                />
              }
            />
          </Box>
          <Box>
            <Box
              sx={style.img}
              component={'img'}
              src={`${imgPath}/${modalHero?.imagesrc}`}
            />
            <Box textAlign={'center'}>
              <Typography
                variant='caption'
                sx={{ color: theme.palette.grey[600] }}
              >
                {modalHero?.illustrator}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography sx={style.text}>
          <span dangerouslySetInnerHTML={{ __html: modalHero?.text || '' }} />
        </Typography>
      </Box>
    </Dialog>
  );
};

export default HeroModal;
