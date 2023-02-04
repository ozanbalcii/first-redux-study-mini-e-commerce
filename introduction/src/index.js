import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/root/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';	
import 'alertifyjs/build/css/alertify.min.css';
import {Provider} from 'react-redux';
import configureStore from './redux/reducers/configureStore';
//! Provider ile app'ye redux özelliğini kazandırıyoruz.
//! configureStore'da app'me dahil ediyorum ve store belirlenmiş oluyor

import { BrowserRouter} from 'react-router-dom'; //!router ekle

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <Provider store = {store}> <App /> </Provider>   
  </BrowserRouter>
);

reportWebVitals();