import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import reportWebVitals from './reportWebVitals';
import App from './Componentes/App/App';
import MediaContextProvider from './Context/MediaStore';
import 'react-toastify/dist/ReactToastify.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MediaContextProvider>
      <App/>
    </MediaContextProvider>
  </React.StrictMode>
);

reportWebVitals();
