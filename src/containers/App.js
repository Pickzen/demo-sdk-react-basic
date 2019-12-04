import React from 'react';
import './App.css';
import SlideContextProvider from '../context/SlideContext'
import Slide from '../slides/Slide'

const cfg = {
    code:'HPTkH7GAWjx'
};

const App = () => (
  <SlideContextProvider>
    <Slide />
  </SlideContextProvider>
);

export {cfg}

export default App;
