import * as React from 'react';

import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { BlockViewer } from '~/components/BlockViewer';
import { NotFoundPage } from '~/pages/NotFoundPage';
import { RootPage } from '~/pages/RootPage';

import { PathsEnum, ROUTES_PATHS } from './constants';

export const AppRoutes = () => (
  <Routes>
    <Route path={PathsEnum.Root} element={<RootPage />}>
      <Route index={true} element={<Navigate to={ROUTES_PATHS.latestBlock} />} />
      <Route path={PathsEnum.Block} element={<Outlet />}>
        <Route index={true} element={<Navigate to={ROUTES_PATHS.latestBlock} />} />
        <Route path={PathsEnum.id} element={<BlockViewer />} />
      </Route>
    </Route>
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);
