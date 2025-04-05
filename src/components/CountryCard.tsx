import React from 'react';
import { Country, isStandardCountry, isSimpleCountry } from '../types/country';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  let flagUrl = '';
  let countryName = '';
  
  if (isStandardCountry(country)) {
    flagUrl = country.flags?.png || country.flags?.svg || country.flag;
    countryName = country.name.common;
  } else if (isSimpleCountry(country)) {
    flagUrl = country.flag;
    countryName = country.name;
  }

  return (
    <div className="country-card">
      <img 
        src={flagUrl} 
        alt={`${countryName} Flag`} 
        className="country-flag"
      />
      <div className="country-name">{countryName}</div>
    </div>
  );
}