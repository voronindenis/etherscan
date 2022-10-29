import * as React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { Error } from '../Error';

interface IErrorState {
  error: Error | void;
}

export class ErrorBoundary extends React.Component<{ children?: React.ReactNode }, IErrorState> {
  constructor(props: {}) {
    super(props);
    this.state = { error: void 0 };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    return this.state.error ? (
      <Container>
        <Row>
          <Col>
            <Error heading={this.state.error.message} message={this.state.error.stack} />
          </Col>
        </Row>
      </Container>
    ) : this.props.children;
  }
}
