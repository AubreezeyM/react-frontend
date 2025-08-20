import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import UserCard from './pages/UserPage';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Navbar />
      <Outlet />
    </QueryClientProvider>
  )
}

export default App
