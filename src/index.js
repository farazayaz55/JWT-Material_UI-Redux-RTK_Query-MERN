import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './Components/Theme';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import {store} from "./Redux/store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  </React.StrictMode>
);


