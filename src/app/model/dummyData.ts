import { Country } from '../model/country';

export const dummyCountries: Country[] = [
  {
    name: 'Afghanistan',
    alpha3Code: 'AFG',
    capital: 'Kabul',
    region: 'Asia',
    subregion: 'Southern Asia',
    population: 27657145,
    flag: 'https://restcountries.eu/data/afg.svg',
    borders: ['IRN', 'PAK', 'TKM', 'UZB', 'TJK', 'CHN'],
    nativeName: 'افغانستان',
    topLevelDomain: '.af',
    currencies: [
      {
        code: 'AFN',
      },
    ],
    languages: [
      {
        name: 'Pashto',
        nativeName: 'پښتو',
      },
      {
        name: 'Uzbek',
        nativeName: 'Oʻzbek',
      },
      {
        name: 'Turkmen',
        nativeName: 'Türkmen',
      },
    ],
  },
  {
    name: 'Albania',
    topLevelDomain: '.al',
    alpha3Code: 'ALB',
    capital: 'Tirana',
    region: 'Europe',
    subregion: 'Southern Europe',
    population: 2886026,
    borders: ['MNE', 'GRC', 'MKD', 'KOS'],
    nativeName: 'Shqipëria',
    currencies: [
      {
        code: 'ALL',
      },
    ],
    languages: [
      {
        name: 'Albanian',
        nativeName: 'Shqip',
      },
    ],

    flag: 'https://restcountries.eu/data/alb.svg',
  },
];
