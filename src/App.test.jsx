import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

const AllProviders = ({ children }) => (
  <MockedProvider mocks={[]} addTypename={false}>
    <MemoryRouter>{children}</MemoryRouter>
  </MockedProvider>
);

it('renders without crashing', () => {
  const renderedApp = render(
    <AllProviders>
      <App />
    </AllProviders>,
  );

  // for debugging your tests
  // eslint-disable-next-line no-console
  console.log(renderedApp.debug());
});
