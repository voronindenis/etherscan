import * as React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

import { ROUTES_PATHS } from '~/routes/constants';

export const RootPage: React.FC = () => (
  <Container>
    <Row>
      <Col>
        <Link className='nav-link' to={ROUTES_PATHS.root}>
          <h1>{'Ethereum blocks viewer'}</h1>
        </Link>
      </Col>
    </Row>
    <hr />
    <Row>
      <Col>
        <Outlet />
      </Col>
    </Row>
  </Container>
);
