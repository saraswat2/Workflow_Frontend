import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Loader from './components/Loader';

function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        {!loaderDone && <Loader onDone={() => setLoaderDone(true)} />}
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
