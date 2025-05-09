import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryDetails from '../components/CountryDetails';

describe('CountryDetails Component', () => {
  const mockCountry = {
    name: {
      common: 'Test Country',
      official: 'Official Test Country'
    },
    capital: ['Test Capital'],
    population: 1000000,
    region: 'Test Region',
    subregion: 'Test Subregion',
    languages: {
      eng: 'English',
      spa: 'Spanish'
    },
    currencies: {
      USD: {
        name: 'US Dollar',
        symbol: '$'
      }
    },
    borders: ['BOR1', 'BOR2'],
    flags: {
      png: 'test-flag.png',
      svg: 'test-flag.svg',
      alt: 'Test Country Flag'
    }
  };

  const mockSetSelectedCountry = jest.fn();

  it('renders country details correctly', () => {
    render(<CountryDetails country={mockCountry} setSelectedCountry={mockSetSelectedCountry} />);
    
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('Test Capital')).toBeInTheDocument();
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
    expect(screen.getByText(/Test Region/)).toBeInTheDocument();
    expect(screen.getByText(/Test Subregion/)).toBeInTheDocument();
    expect(screen.getByText('English, Spanish')).toBeInTheDocument();
    expect(screen.getByText('US Dollar ($)')).toBeInTheDocument();
  });

  it('renders country flag', () => {
    render(<CountryDetails country={mockCountry} setSelectedCountry={mockSetSelectedCountry} />);
    const flagImage = screen.getByAltText('Test Country');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', 'test-flag.svg');
  });

  it('renders border countries', () => {
    render(<CountryDetails country={mockCountry} setSelectedCountry={mockSetSelectedCountry} />);
    expect(screen.getByText('BOR1')).toBeInTheDocument();
    expect(screen.getByText('BOR2')).toBeInTheDocument();
  });
}); 