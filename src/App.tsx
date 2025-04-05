import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import './App.css';
import CountryGrid from './components/CountryGrid';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import { fetchCountries } from './lib/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function CountriesApp() {
  const { 
    data: countries, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries
  });

  if (isLoading) return <LoadingState />;
  
  if (error) return <ErrorState error={error} onRetry={() => refetch()} />;
  
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Countries of the World</h1>
      </header>
      <main className="main">
        {countries && <CountryGrid countries={countries} />}
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CountriesApp />
    </QueryClientProvider>
  );
}

export default App;