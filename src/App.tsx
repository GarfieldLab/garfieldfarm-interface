import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';

import FarmsProvider from './contexts/Farms';
import VaultsProvider from './contexts/Vaults';
import GoFarmProvider from './contexts/GoFarmProvider';
import ModalsProvider from './contexts/Modals';

import Farms from './views/Farms';
import Vaults from './views/Vaults';

import store from './state';
import theme from './theme';
import config from './config';
import Updaters from './state/Updaters';
import Popups from './components/Popups';

const App: React.FC = () => {
  return (
    <Providers>
      <Router basename="/">
        <Switch>
        <Route path="/" exact>
            <Farms />
          </Route>
          <Route path="/farm">
            <Farms />
          </Route>
          <Route path="/vault">
            <Vaults />
          </Route>
        </Switch>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider chainId={config.chainId}>
        <Provider store={store}>
          <Updaters />
          <GoFarmProvider>
            <ModalsProvider>
              <FarmsProvider>
                <VaultsProvider>
                    <>
                      <Popups />
                      {children}
                    </>
                </VaultsProvider>
              </FarmsProvider>
            </ModalsProvider>
          </GoFarmProvider>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;
