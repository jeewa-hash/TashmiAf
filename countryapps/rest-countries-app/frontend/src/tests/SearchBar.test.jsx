import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  const mockSetSearchTerm = jest.fn();

  beforeEach(() => {
    mockSetSearchTerm.mockClear();
  });

  it('renders search input', () => {
    render(<SearchBar setSearchTerm={mockSetSearchTerm} />);
    
    expect(screen.getByPlaceholderText('🔍 Search by country name')).toBeInTheDocument();
  });

  it('calls setSearchTerm when input changes', () => {
    render(<SearchBar setSearchTerm={mockSetSearchTerm} />);
    
    const input = screen.getByPlaceholderText('🔍 Search by country name');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
  });

  it('updates input value when typing', () => {
    render(<SearchBar setSearchTerm={mockSetSearchTerm} />);
    
    const input = screen.getByPlaceholderText('🔍 Search by country name');
    fireEvent.change(input, { target: { value: 'test country' } });
    
    expect(input.value).toBe('test country');
  });
}); 