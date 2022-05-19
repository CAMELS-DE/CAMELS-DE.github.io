import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useSelector } from 'react-redux';


// import pages
import Home from './pages/Home';
import { RootState } from './store';


function App() {
  // subscribe to theme changes
  const themeMode = useSelector((state: RootState) => state.settings.theme);

  // create the theme
  const theme = createTheme({
    palette: {
      mode: themeMode,
    }
  })

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
  );
}

export default App;
