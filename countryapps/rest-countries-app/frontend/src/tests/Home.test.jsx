// src/tests/Home.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

describe('Home Component', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test('renders the main heading with emoji', () => {
    // Use regex to match the emoji and text
    expect(
      screen.getByRole('heading', { name: /🌍\s*Country Explorer/i })
    ).toBeInTheDocument();
  });

  test('renders the subheading', () => {
    expect(
      screen.getByText(/explore the world’s countries by name, region, or language/i)
    ).toBeInTheDocument();
  });

  test('renders the Explore Now button', () => {
    // It's a link styled as a button
    expect(
      screen.getByRole('link', { name: /explore now/i })
    ).toBeInTheDocument();
  });

  test('renders animated stars', () => {
    // There should be at least one star with the class 'bg-white'
    const stars = document.querySelectorAll('.bg-white');
    expect(stars.length).toBeGreaterThan(0);
  });
});
