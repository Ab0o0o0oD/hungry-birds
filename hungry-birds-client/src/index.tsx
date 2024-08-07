import '@/styles/global.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import AuthProvider from './AuthContext';
import { ProtectedRoute } from './components/protectedRoute';
import ErrorPage from './error-page';
import Dashboard from './pages/Dashboard/DashboardPage';
import Receipt from './pages/Receipt/Receipt';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Dashboard/Login/Login';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
