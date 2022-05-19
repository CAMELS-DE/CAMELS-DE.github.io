import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

// import pages
import Home from './pages/Home';
import { RootState } from './store';
import { setPegel } from './features/dataSlice';


function App() {
  const dispatch = useDispatch();

  // subscribe to theme changes
  const themeMode = useSelector((state: RootState) => state.settings.theme);

  // create the theme
  const theme = createTheme({
    palette: {
      mode: themeMode,
    }
  })

  // load the pegel Data once
  useEffect(() => {
    axios.get<GeoJSON.FeatureCollection<GeoJSON.Point>>('https://api.camels-de.org/state/pegel.json').then(res => {
      dispatch(setPegel(res.data));
    })
  });

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
  );
}

export default App;
