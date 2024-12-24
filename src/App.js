import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './views/pages/AdminPanel';
import Home from './views/pages/Home';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './index.sass';

let theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(',')
  },
  palette: {
    background: {
      darkBlue: '#3A4F7A'
    }
  }
});

theme = responsiveFontSizes(theme);

const App = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (i18n.language !== 'ua' && i18n.language !== 'en') {
      const lang = i18n.language.substring(0, 2);
      if (lang === 'ua') {
        i18n.changeLanguage('ua');
      } else {
        i18n.changeLanguage('en');
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Routes>
          <Route path="/admin/*" element={<Dashboard />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
