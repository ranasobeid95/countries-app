export interface Country {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  flag: string;
  borders: string[];
  population: number;
  topLevelDomain: string;
  nativeName: string;
  currencies: { code?: string }[];
  languages: { nativeName?: string; name?: string }[];
}
