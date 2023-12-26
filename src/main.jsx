import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
  <ChakraProvider>
      <App />
    <Toaster
      position="top-center"
      toastOptions={{
        success: {
          style: {
            background: '#1F2937',
            color: 'white'
          },
        },
      }}
      reverseOrder={false}
    />
    </ChakraProvider>
  </React.StrictMode>
</QueryClientProvider>,
)
