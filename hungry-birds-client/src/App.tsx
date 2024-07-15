import React from 'react';
import '@/styles/App.scss';
import { MainPage } from './pages/MainPage';
import { ItemProvider } from './state/ItemContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ItemProvider>
          <MainPage />
        </ItemProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
