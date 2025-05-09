import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegionFilter from '../components/RegionFilter';

describe('RegionFilter Component', () => {
  const mockSetRegion = jest.fn();
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  beforeEach(() => {
    mockSetRegion.mockClear();
  });

  it('renders region filter select', () => {
    render(<RegionFilter setRegion={mockSetRegion} />);
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('calls setRegion when region is selected', () => {
    render(<RegionFilter setRegion={mockSetRegion} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Africa' } });
    
    expect(mockSetRegion).toHaveBeenCalledWith('Africa');
  });

  it('renders all region options', () => {
    render(<RegionFilter setRegion={mockSetRegion} />);
    
    regions.forEach(region => {
      expect(screen.getByText(region)).toBeInTheDocument();
    });
  });
}); 