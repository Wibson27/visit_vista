// src/components/PlacesGrid.js
import React, { useState, useEffect } from 'react';

function PlacesGrid() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
      try {
          const response = await fetch('/api/places');
          if (!response.ok) throw new Error('Failed to fetch');
          const data = await response.json();
          setPlaces(data);
          setLoading(false);
      } catch (err) {
          setError(err.message);
          setLoading(false);
      }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div className="w-layout-grid places-grid">
          {places.map(place => (
              <div key={place.id}>
                  <div data-w-id="525a02b3-cdd5-472c-395f-bbdd5475c879"
                       style={{opacity: 1}}
                       className="intro-box">
                      <div className="intro-link-block w-inline-block">
                          <img src={place.images[0]}
                               loading="lazy"
                               width="319"
                               alt={place.name}/>
                          <div data-w-id="9bba05d0-28d0-279d-3877-59b7d4feb8e0"
                               className="parallax-image about-intro">
                              <div style={{display: 'none', opacity: 0}}
                                   className="item-hover-overlay">
                              </div>
                              <div style={{opacity: 0}}
                                   className="blur-hover-overlay">
                              </div>
                              <div className="button-hover small">
                                  View<br/>Details
                              </div>
                          </div>
                      </div>
                      <div>
                          <span className="title-medium-link">{place.name}</span>
                      </div>
                      <div className="intro-text-box">
                          <p>{place.description}</p>
                          <div className="price">
                              Rp {place.price.toLocaleString()}
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
  );
}

export default PlacesGrid;