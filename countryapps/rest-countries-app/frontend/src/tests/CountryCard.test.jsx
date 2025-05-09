import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryCard from '../components/CountryCard';

describe('CountryCard Component', () => {
  const mockCountry = {
    name: {
      common: 'Test Country'
    },
    capital: ['Test Capital'],
    population: 1000000,
    region: 'Test Region',
    flags: {
      png: 'test-flag.png',
      svg: 'test-flag.svg'
    },
    cca3: 'TST'
  };

  const mockOnClick = jest.fn();

  it('renders country information correctly', () => {
    render(<CountryCard country={mockCountry} onClick={mockOnClick} />);
    
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('Test Capital')).toBeInTheDocument();
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
    expect(screen.getByText('Test Region')).toBeInTheDocument();
  });

  it('renders country flag', () => {
    render(<CountryCard country={mockCountry} onClick={mockOnClick} />);
    const flagImage = screen.getByAltText('Test Country flag');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', 'test-flag.svg');
  });

  it('calls onClick when clicked', () => {
    render(<CountryCard country={mockCountry} onClick={mockOnClick} />);
    const card = screen.getByText('Test Country').closest('div');
    card.click();
    expect(mockOnClick).toHaveBeenCalledWith(mockCountry);
  });
}); 