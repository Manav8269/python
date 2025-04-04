import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('renders counter with initial value of 0', () => {
  render(<Counter />);
  const counterText = screen.getByText(/Counter: 0/i);
  expect(counterText).toBeInTheDocument();
});

test('increments counter when the "Increment" button is clicked', () => {
  render(<Counter />);
  const incrementButton = screen.getByRole('button', { name: /Increment/i });

  fireEvent.click(incrementButton);

  expect(screen.getByText(/Counter: 1/i)).toBeInTheDocument();
});

test('decrements counter when the "Decrement" button is clicked', () => {
  render(<Counter />);
  const incrementButton = screen.getByRole('button', { name: /Increment/i });
  const decrementButton = screen.getByRole('button', { name: /Decrement/i });

  fireEvent.click(incrementButton); // Increment to 1
  fireEvent.click(decrementButton); // Decrement back to 0

  expect(screen.getByTestId("count")).toHaveTextContent("0");

});
