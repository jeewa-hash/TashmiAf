import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CountryExplorer from '../components/CountryExplorer';
 // Make sure to adjust the relative import path

// Mock child components to isolate test scope
jest.mock('../components/SearchBar', () => ({ setSearchTerm }) => (
  <input
    placeholder="Search"
    onChange={(e) => setSearchTerm(e.target.value)}
    data-testid="search-bar"
  />
));
jest.mock('../components/RegionFilter', () => () => <div data-testid="region-filter" />);
jest.mock('../components/LanguageFilter', () => () => <div data-testid="language-filter" />);
jest.mock('../components/CountryCard', () => ({ country, onClick }) => (
  <div onClick={onClick} data-testid="country-card">{country.name.common}</div>
));
jest.mock('../components/CountryDetails', () => ({ country }) => (
  <div data-testid="country-details">{country.name.common} Details</div>
));
jest.mock('../components/ClockCalendar', () => () => <div data-testid="clock-calendar">Clock</div>);
jest.mock('react-globe.gl', () => () => <div data-testid="react-globe">Globe</div>);

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === 'user') return JSON.stringify({ name: 'Tashmi' });
    if (key === 'favorites') return JSON.stringify([]);
    return null;
  });
  Storage.prototype.setItem = jest.fn();
});

describe('CountryExplorer Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              cca3: 'USA',
              name: { common: 'United States' },
              region: 'Americas',
              languages: { eng: 'English' },
            },
            {
              cca3: 'FRA',
              name: { common: 'France' },
              region: 'Europe',
              languages: { fra: 'French' },
            },
          ]),
      })
    );
  });

  it('renders heading and fetches countries', async () => {
    render(<CountryExplorer />);
    expect(screen.getByText(/Welcome to Country Explorer/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByTestId('country-card')).toHaveLength(2);
    });
  });

  it('filters countries by search term', async () => {
    render(<CountryExplorer />);
    await waitFor(() => screen.getAllByTestId('country-card'));
    const searchBar = screen.getByTestId('search-bar');
    fireEvent.change(searchBar, { target: { value: 'France' } });
    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.queryByText('United States')).toBeNull();
    });
  });

  it('opens country details modal when country is clicked', async () => {
    render(<CountryExplorer />);
    await waitFor(() => screen.getAllByTestId('country-card'));
    fireEvent.click(screen.getByText('France'));
    expect(await screen.findByTestId('country-details')).toHaveTextContent('France Details');
  });

  it('adds country to favorites', async () => {
    render(<CountryExplorer />);
    await waitFor(() => screen.getAllByTestId('country-card'));
    fireEvent.click(screen.getByText('France'));

    const addButton = await screen.findByText(/Add to Favorites/i);
    window.alert = jest.fn(); // mock alert
    fireEvent.click(addButton);
    expect(window.alert).toHaveBeenCalledWith('France added to favorites!');
  });

  it('handles pagination', async () => {
    // Provide more than 12 countries
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve(
            Array.from({ length: 15 }, (_, i) => ({
              cca3: `C${i}`,
              name: { common: `Country${i}` },
              region: 'TestRegion',
              languages: { test: 'TestLang' },
            }))
          ),
      })
    );
    render(<CountryExplorer />);
    await waitFor(() => screen.getAllByTestId('country-card'));
    expect(screen.getAllByTestId('country-card').length).toBe(12);
    fireEvent.click(screen.getByText('2'));
    expect(await screen.findByText('Country12')).toBeInTheDocument();
  });
});
