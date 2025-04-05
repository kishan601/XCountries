import React from 'react';
import CountryCard from './CountryCard';
import { Country } from '../types/country';

interface CountryGridProps {
  countries: Country[];
}

export default function CountryGrid({ countries }: CountryGridProps) {
  return (
    <div className="country-grid">
      {countries.map((country, index) => (
        <CountryCard key={index} country={country} />
      ))}
    </div>
  );
}