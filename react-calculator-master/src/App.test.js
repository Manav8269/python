import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Calculator/i);  // Adjust this if needed
  expect(titleElement).toBeInTheDocument();
});
