import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '~/components/ErrorBoundary';
import { AppRoutes } from '~/routes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
};
