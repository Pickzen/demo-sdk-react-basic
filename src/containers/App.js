import React from 'react';
import './App.css';
import SlideContextProvider from '../context/SlideContext'
import Slide from '../slides/Slide'

const cfg = window.pickzen||{};

if (!cfg.server) cfg.server='https://app.pickzen.com';
if (!cfg.preview) cfg.preview=0;

const App = () => (
  <SlideContextProvider>
    <Slide />
  </SlideContextProvider>
);

export {cfg}
export default App;
