import * as React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Error } from '~/components/Error';
import { ROUTES_PATHS } from '~/routes/constants';

export const NotFoundPage: React.FC = () => (
  <Container>
    <Row>
      <Col>
        <Error heading='Page not found' message={<Link to={ROUTES_PATHS.root}>{'Go to the main page'}</Link>} />
      </Col>
    </Row>
  </Container>
);
