// src/places-app.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import PlacesGrid from './components/PlacesGrid.js';

const root = ReactDOM.createRoot(document.getElementById('places-grid'));
root.render(
  <React.StrictMode>
    <PlacesGrid />
  </React.StrictMode>
);