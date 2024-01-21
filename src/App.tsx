import { CssBaseline, Paper } from '@mui/material';
import './App.css';
import DeckListSelector from './components/deck/DeckListSelector';
import { AppProvider } from './contexts/app-context';
import DeckList from './components/deck/DeckList';

function App() {
  const style = {
    root: {
      width: '90%',
      height: '90%',
      margin: '2rem auto 0',
    },
  };
  return (
    <CssBaseline>
      <AppProvider>
        <Paper elevation={4} sx={style.root}>
          <DeckListSelector />
          <DeckList />
        </Paper>
      </AppProvider>
    </CssBaseline>
  );
}

export default App;
