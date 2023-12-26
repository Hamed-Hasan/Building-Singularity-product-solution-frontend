import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import Loading from './shared/Loading/Loading';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading delay, replace this with your actual data fetching logic
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timeout on component unmount or when the data is fetched
    return () => clearTimeout(timeout);
  }, []);

  return (
    <RouterProvider router={router}>
      {loading ? <Loading /> : <router.element />}
    </RouterProvider>
  );
};

export default App;
