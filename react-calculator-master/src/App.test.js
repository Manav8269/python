import React from 'react'; // Add this line
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator header', () => {
  render(<App />);
  expect(screen.getByText(/Calculator/i)).toBeInTheDocument();
});

test('renders a number button', () => {
  render(<App />);
  expect(screen.getByText(/7/i)).toBeInTheDocument(); // Example: Check if "7" button exists
});
