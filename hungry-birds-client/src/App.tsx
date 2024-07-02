import React from 'react';
import '@/styles/App.scss';
import { MainPage } from './pages/MainPage';
import { ItemProvider } from './state/ItemContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <div className="App">
      <header className="header">
        <img
          className="header-img"
          src="./assets/shawarmarull.jpg"
          alt="header"
        />
        <div className="logo-wrapper">
          <img className="logo" src="./assets/logo.PNG" alt="logo" />
        </div>
      </header>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ItemProvider>
          <MainPage />
        </ItemProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
