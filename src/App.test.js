import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn weather forecast', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/weather forecast/i);
  expect(linkElement).toBeInTheDocument();
});
