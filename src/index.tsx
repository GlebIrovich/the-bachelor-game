import './index.css';

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks';
import ReactDOM from 'react-dom';

import App from './App';
import { client } from './client';
import { OverlayProvider } from './context/overlays/OverlaysContext';
import { EffectsProvider } from './context/specialEffects';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ApolloProviderHooks client={client}>
    <ApolloProvider client={client}>
      <OverlayProvider>
        <EffectsProvider>
          <App />
        </EffectsProvider>
      </OverlayProvider>
    </ApolloProvider>
  </ApolloProviderHooks>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
