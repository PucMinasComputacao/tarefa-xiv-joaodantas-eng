const API = 'http://localhost:3000/lugares';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hb2RhbnRhc3MiLCJhIjoiY21xMDc4cGU0MDA2bDJzcHZ4bndmdmcxNyJ9.SOWKbYIP4d8Y4liJ2Fuv0g';

const mapa = new mapboxgl.Map({
  container: 'mapa',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [20, 20],  
  zoom: 1.5
});

mapa.addControl(new mapboxgl.NavigationControl());

fetch(API)
  .then(res => res.json())
  .then(lugares => {
    lugares.forEach(lugar => {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <h3 style="margin:0 0 4px 0; font-size:1rem;">${lugar.nome}</h3>
          <p style="margin:0; font-size:0.85rem; color:#555;">📍 ${lugar.pais}</p>
          <p style="margin:4px 0 0 0; font-size:0.82rem;">${lugar.descricao}</p>
        `);

      new mapboxgl.Marker({ color: '#4a9e6a' })
        .setLngLat([lugar.lng, lugar.lat])
        .setPopup(popup)
        .addTo(mapa);
    });
  });