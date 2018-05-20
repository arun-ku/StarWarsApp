import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MessageManagerProvider } from 'react-message-manager';

import App from './Components/App';

import configureStore from './redux/store';

const store = configureStore();

export const themeHash = {
  palette: {
    primary: colors.blue,
    secondary: colors.deepOrange,
    error: colors.red,
    accent: colors.cyan,
    accentTwo: colors.deepOrange,
    disabled: '#bdc3c7',
    success: '#2ecc71',
    backgrounds: {
      default: '#f5f5f5',
      dark: colors.grey,
    }
  },
  appBar: {
    height: 56, // Instead of 64
  },
  icons: {
    primaryHeight: '15px',
    primaryWidth: '15px'
  },
  overrides: {
    MuiTabs: {
      fixed: {
        overflow: 'hidden',
      },
    },
    MuiTab: {
      rootPrimarySelected: {
        transform: 'scale(1.2)',
      },
    },
  },
};

export const theme = createMuiTheme(themeHash);

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <MessageManagerProvider desktopView>
        <Fragment>
          <CssBaseline />
          <App />
        </Fragment>
      </MessageManagerProvider>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);