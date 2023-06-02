import CathoLogo from './logos/catho.svg';
import EncontraLogo from './logos/encontra.svg';
import GympassLogo from './logos/gympass.svg';
import OlistLogo from './logos/olist.svg';

export interface ICompanies {
  name: string;
  startYear: number;
  endYear?: number;
  description: string;
  logo: React.ComponentType<any> | React.ComponentType<any>;
}

export const companies: Array<ICompanies> = [
  {
    name: 'Olist',
    startYear: 2021,
    endYear: undefined,
    description: 'olist-description',
    logo: OlistLogo,
  },
  {
    name: 'Gympass',
    startYear: 2019,
    endYear: 2021,
    description: 'gympass-description',
    logo: GympassLogo,
  },
  {
    name: 'Catho',
    startYear: 2015,
    endYear: 2019,
    description: 'catho-description',
    logo: CathoLogo,
  },
  {
    name: 'Encontra Brasil',
    startYear: 2014,
    endYear: 2015,
    description: 'encontra-description',
    logo: EncontraLogo,
  },
];
