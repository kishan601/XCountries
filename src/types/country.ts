export interface StandardCountry {
    name: {
      common: string;
      official: string;
      nativeName?: Record<string, { official: string; common: string }>;
    };
    cca2: string;
    cca3: string;
    flags: {
      png: string;
      svg: string;
      alt?: string;
    };
    flag: string;
  }
  
  export interface SimpleCountry {
    name: string;
    flag: string;
    abbr: string;
  }
  
  export type Country = StandardCountry | SimpleCountry;
  
  export function isStandardCountry(country: Country): country is StandardCountry {
    return (
      typeof country === 'object' &&
      country !== null &&
      'name' in country &&
      typeof country.name === 'object' &&
      'common' in country.name
    );
  }
  
  export function isSimpleCountry(country: Country): country is SimpleCountry {
    return (
      typeof country === 'object' &&
      country !== null &&
      'name' in country &&
      typeof country.name === 'string'
    );
  }