<<<<<<< HEAD
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import App from './App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
=======
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import App from './App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
>>>>>>> 9f0664ac30d3fd670a3bcb1a34268c932f907d3f
);